import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { StagesService } from "../stages/stages.service";
import { PlayersStatsRaw, PlayerStatsRaw } from "./dto/get-player-stats.raw";
import { RoundResultsRaw } from "./dto/get-results.raw";
import { GetStatsArgs } from "./dto/get-stats.args";
import { RoundResult } from "./round-result.entity";
import { LobbyPlayerInfosService } from "../lobby-player-infos/lobby-player-infos.service";
import {
  addPastPoints,
  formatLobbyGroupResults,
  formatLobbyResults,
  fromRawToConsolidatedRoundResults,
} from "./round-result.adapter";
import {
  SortingMethodsNeedPastResults,
  sortResults,
} from "./round-result.logic";
import { PlayerWithStats } from "../players/dto/get-player-stats.out";
import { formatStats } from "../players/players.adapter";
import { CreateLobbyGroupResultArgs } from "./dto/create-lobby-group-result.args";
import { LobbiesService } from "../lobbies/lobbies.service";
import { parseFileString } from "../lib/FileParser";
import {
  buildResults,
  createRoundResultEntries,
  extractLobbyPlayerEntries,
  sortLobbies,
} from "./bulk-creation.logic";
import { LobbyGroupWithLobbies } from "./dto/get-lobby-results.out";
import { RoundsService } from "../rounds/rounds.service";

interface FileLineWithPlayerLobby {
  lobbyPlayerId: number;
  roundId: number;
  position: number;
}

@Injectable()
export class RoundResultsService {
  constructor(
    @InjectRepository(RoundResult)
    private roundResultsRepository: Repository<RoundResult>,
    private stagesService: StagesService,
    private lobbyPlayerInfosService: LobbyPlayerInfosService,
    private lobbiesService: LobbiesService,
    private roundsService: RoundsService,
  ) {}

  public async createResults({
    lobbyGroupId,
    results,
  }: CreateLobbyGroupResultArgs): Promise<RoundResult[]> {
    const { roundsPlayed, sequence, stageId } =
      await this.lobbiesService.findOneLobbyGroup(lobbyGroupId);
    const { rounds } = await this.stagesService.findOne(stageId, ["rounds"]);
    const positionInputs = formatLobbyGroupResults(
      results,
      roundsPlayed,
      sequence,
      rounds,
    );
    return this.roundResultsRepository.save(positionInputs);
  }

  public async createBulk(
    fileString: string,
    stageId: number,
    ignorePlayerNumber: boolean,
  ): Promise<RoundResult[]> {
    const { titles, lines } = parseFileString(fileString);
    const [player, position] = titles;
    if (player !== "Player" || position !== "Position") {
      throw new BadRequestException(`${player} - ${position}`);
    }

    const [
      allStageLobbies,
      allStageLobbyGroups,
      allStageRounds,
      { players: allStagePlayers },
    ] = await Promise.all([
      this.lobbiesService.findAllByStage(stageId),
      this.lobbiesService.findAllLobbyGroupsByStage(stageId),
      this.roundsService.findByStage(stageId),
      this.stagesService.findOne(stageId, ["players", "players.player"]),
    ]);

    if (!ignorePlayerNumber && lines.length % allStagePlayers.length !== 0) {
      throw new BadRequestException(
        "Number of lines does not match number of stage players",
      );
    }

    if (
      !ignorePlayerNumber &&
      lines.length / allStagePlayers.length !== allStageLobbyGroups.length
    ) {
      throw new BadRequestException(
        "Number of lines does not match number of lobby groups",
      );
    }

    const sortedLobbies = sortLobbies(allStageLobbyGroups, allStageLobbies);

    const resultEntries = buildResults(
      lines,
      allStagePlayers,
      allStageLobbyGroups,
      allStageRounds,
      sortedLobbies,
    );

    const lobbyPlayerEntries = extractLobbyPlayerEntries(resultEntries);

    const lobbyPlayers =
      await this.lobbyPlayerInfosService.createManyLobbyPlayers(
        lobbyPlayerEntries,
      );

    const finalPayload: FileLineWithPlayerLobby[] = createRoundResultEntries(
      resultEntries,
      lobbyPlayers,
    );

    return this.roundResultsRepository.save(finalPayload);
  }

  public async overviewResultsByStage(stageId: number) {
    const { tiebreakers, tournamentId, sequence } =
      await this.stagesService.findOne(stageId);
    const results = await this.findResultsByStage(stageId);
    const formattedResults = fromRawToConsolidatedRoundResults(results);
    if (tiebreakers?.some((t) => SortingMethodsNeedPastResults.includes(t))) {
      const allTournamentStages = await this.stagesService.findAllByTournament(
        tournamentId,
      );
      const previousStages = allTournamentStages.filter(
        (s) => s.sequence < sequence,
      );
      if (previousStages.length) {
        const previousStagesResult = await Promise.all(
          previousStages.map((stage) => this.findResultsByStage(stage.id)),
        );
        const resultsWithPast = addPastPoints(
          formattedResults,
          previousStagesResult,
        );
        return sortResults(resultsWithPast, tiebreakers);
      }
    }
    return sortResults(formattedResults, tiebreakers);
  }

  public async lobbyResultsByStage(
    stageId: number,
  ): Promise<LobbyGroupWithLobbies[]> {
    const lobbyGroups = await this.lobbiesService.findAllLobbyGroupsByStage(
      stageId,
    );

    const lobbies = await Promise.all(
      lobbyGroups.map((lobbyGroup) =>
        this.lobbiesService.findAllByLobbyGroup(lobbyGroup.id),
      ),
    );

    const resultsByLobby = lobbies.map((lobbyGroup) =>
      Promise.all(
        lobbyGroup.map((lobby) => this.resultsByLobby(lobby.id, stageId)),
      ),
    );

    const result = await Promise.all(resultsByLobby);

    return formatLobbyResults(lobbyGroups, lobbies, result);
  }

  public async resultsByLobbyGroup(lobbyGroupId: number) {
    const results = await this.findResultsByLobbyGroup(lobbyGroupId);
    return fromRawToConsolidatedRoundResults(results);
  }

  public async playerStats(args: GetStatsArgs) {
    const stats = await this.findStats(args);
    const formatted: PlayerWithStats[] = stats.map(
      ({ id, name, region, country, slug, ...stats }) => ({
        player: {
          id,
          name,
          region,
          country,
          slug,
        },
        ...formatStats(stats),
      }),
    );
    return formatted;
  }

  public findStatsByPlayer(
    playerId: number,
    setId?: number,
    tournamentId?: number,
  ): Promise<PlayerStatsRaw | undefined> {
    const queryBuilder =
      this.roundResultsRepository.manager.createQueryBuilder();
    // add subquery here to get the / total games values
    return queryBuilder
      .select('"totalGames"')
      .addSelect('"averagePosition"')
      .addSelect('"topFourCount" / "totalGames"', "topFourPercent")
      .addSelect('"topOneCount" / "totalGames"', "topOnePercent")
      .addSelect('"eigthCount" / "totalGames"', "eigthPercent")
      .addSelect("id")
      .addSelect("name")
      .addSelect("region")
      .addSelect("country")
      .from((qb) => {
        let query = this.getBaseStatsQuery(qb)
          .addSelect("player.*")
          .from("round_result", "result")
          .innerJoin(
            "lobby_player_info",
            "lpi",
            "lpi.id = result.lobbyPlayerId",
          )
          .innerJoin("player", "player", "player.id = lpi.playerId")
          .innerJoin("lobby", "lobby", "lobby.id = lpi.lobbyId")
          .innerJoin("stage", "stage", "stage.id = lobby.stageId")
          .innerJoin(
            "tournament",
            "tournament",
            "tournament.id = stage.tournamentId",
          )
          .groupBy("player.id")
          .where("lpi.playerId = :playerId", { playerId });

        if (setId) {
          query = query.andWhere("tournament.setId = :setId", { setId });
        }

        if (tournamentId) {
          query = query.andWhere("tournament.id = :tournamentId", {
            tournamentId,
          });
        }

        return query;
      }, "rawStats")
      .getRawOne() as Promise<PlayerStatsRaw | undefined>;
  }

  private findResultsByStage(stageId: number): Promise<RoundResultsRaw[]> {
    const queryBuilder =
      this.roundResultsRepository.manager.createQueryBuilder();
    const baseQuery = this.getBaseResultsQuery(queryBuilder);
    return baseQuery.where("stage.id = :stageId", { stageId }).getRawMany();
  }

  private async resultsByLobby(lobbyId: number, stageId: number) {
    const { tiebreakers } = await this.stagesService.findOne(stageId);
    const results = await this.findResultsByLobby(lobbyId);
    const formattedResults = fromRawToConsolidatedRoundResults(results);
    return sortResults(formattedResults, tiebreakers);
  }

  private findResultsByLobby(lobbyId: number): Promise<RoundResultsRaw[]> {
    const queryBuilder =
      this.roundResultsRepository.manager.createQueryBuilder();
    const baseQuery = this.getBaseResultsQuery(queryBuilder);
    return baseQuery.where("lobby.id = :lobbyId", { lobbyId }).getRawMany();
  }

  private findResultsByLobbyGroup(
    lobbyGroupId: number,
  ): Promise<RoundResultsRaw[]> {
    const queryBuilder =
      this.roundResultsRepository.manager.createQueryBuilder();
    const baseQuery = this.getBaseResultsQuery(queryBuilder);
    return baseQuery
      .where("lobby.lobbyGroupId = :lobbyGroupId", { lobbyGroupId })
      .getRawMany();
  }

  private findStats({
    setId,
    skip,
    take = 10,
    region,
    tournamentIds,
    sort,
    minimumGames = 0,
  }: Partial<GetStatsArgs>): Promise<PlayersStatsRaw[]> {
    return this.roundResultsRepository.manager
      .createQueryBuilder()
      .select("*")
      .from((subquery) => {
        return subquery
          .select('"totalGames"')
          .addSelect('"averagePosition"')
          .addSelect('"topFourCount" / "totalGames"', "topFourPercent")
          .addSelect('"topOneCount" / "totalGames"', "topOnePercent")
          .addSelect('"eigthCount" / "totalGames"', "eigthPercent")
          .addSelect("id")
          .addSelect("name")
          .addSelect("region")
          .addSelect("country")
          .addSelect("slug")
          .from((rawSubquery) => {
            const baseQuery = this.getBaseStatsQuery(rawSubquery);
            let query = baseQuery
              .addSelect("player.*")
              .from("round_result", "result")
              .innerJoin(
                "lobby_player_info",
                "lpi",
                "lpi.id = result.lobbyPlayerId",
              )
              .innerJoin("player", "player", "player.id = lpi.playerId")
              .innerJoin("lobby", "l", "l.id = lpi.lobbyId")
              .innerJoin("stage", "s", "s.id = l.stageId")
              .innerJoin("tournament", "t", "t.id = s.tournamentId")
              .groupBy("player.id");

            if (region) {
              query = query.andWhere("player.region = :region", { region });
            }

            if (setId) {
              query = query.andWhere("t.setId = :setId", { setId });
            }

            if (tournamentIds && tournamentIds.length) {
              query = query.andWhere("t.id IN (:...tournamentIds)", {
                tournamentIds,
              });
            }

            return query;
          }, "rawStats");
      }, "stats")
      .where('stats."totalGames" > :minimumGames', { minimumGames })
      .orderBy(
        sort
          ? { [`stats.\"${sort.column}\"`]: sort.asc ? "ASC" : "DESC" }
          : { [`stats.\"averagePosition\"`]: "ASC" },
      )
      .take(take)
      .skip(skip)
      .getRawMany<PlayersStatsRaw>();
  }

  private getBaseResultsQuery(
    queryBuilder: SelectQueryBuilder<any>,
  ): SelectQueryBuilder<any> {
    return queryBuilder
      .select(
        "result.roundId, result.position, lpi.id, lpi.playerId, round.sequence, player.name, player.region, player.country, player.slug, points.points",
      )
      .from("lobby_player_info", "lpi")
      .innerJoin("lobby", "lobby", "lobby.id = lpi.lobbyId")
      .innerJoin("stage", "stage", "stage.id = lobby.stageId")
      .innerJoin("player", "player", "player.id = lpi.playerId")
      .leftJoin("round_result", "result", "lpi.id = result.lobbyPlayerId")
      .leftJoin(
        "points",
        "points",
        "points.pointSchemaId = stage.pointSchemaId and points.position = result.position",
      )
      .leftJoin("round", "round", "round.id = result.roundId")
      .orderBy("lpi.id, round.sequence")
      .leftJoin(
        "stage_player_info",
        "spi",
        "spi.stageId = stage.id and spi.playerId = player.id",
      )
      .addSelect("COALESCE(spi.extraPoints, 0)", "extraPoints")
      .addSelect("COALESCE(spi.tiebreakerRanking, 0)", "tiebreakerRanking");
  }

  private getBaseStatsQuery(
    queryBuilder: SelectQueryBuilder<any>,
  ): SelectQueryBuilder<any> {
    return queryBuilder
      .select(`CAST(COUNT(*) as decimal)`, "totalGames")
      .addSelect(
        `CAST(COALESCE(AVG(position),0) as decimal)`,
        "averagePosition",
      )
      .addSelect(
        `CAST(COALESCE(SUM(CASE WHEN position <= 4 THEN 1 ELSE 0 END),0) as decimal)`,
        "topFourCount",
      )
      .addSelect(
        `CAST(COALESCE(SUM(CASE WHEN position = 1 THEN 1 ELSE 0 END),0) as decimal)`,
        "topOneCount",
      )
      .addSelect(
        `CAST(COALESCE(SUM(CASE WHEN position = 8 THEN 1 ELSE 0 END),0) as decimal)`,
        "eigthCount",
      );
  }
}
