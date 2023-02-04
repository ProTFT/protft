import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { StagesService } from "../stages/stages.service";
import { PlayersStatsRaw, PlayerStatsRaw } from "./dto/get-player-stats.raw";
import { RoundResultsRaw } from "./dto/get-results.raw";
import { GetStatsArgs } from "./dto/get-stats.args";
import { RoundResult } from "./round-result.entity";
import chunk from "lodash.chunk";
import { LobbyPlayerInfosService } from "../lobby-player-infos/lobby-player-infos.service";
import { Round } from "../rounds/round.entity";

interface BaseFileLine {
  playerId: number;
  playerPositions: number[];
}

interface FileLineWithLobby extends BaseFileLine {
  lobbyId: number;
}

interface FileLineWithLobbyAndRound {
  playerId: number;
  lobbyId: number;
  roundId: number;
  position: number;
}

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
  ) {}

  public createResults(results: RoundResult[]): Promise<RoundResult[]> {
    return this.roundResultsRepository.save(results);
  }

  public async createBulk(
    fileString: string,
    stageId: number,
    lobbyGroupId?: number,
  ): Promise<RoundResult[]> {
    const [fileHeader, ...lines] = fileString.replace(/\r/g, "").split("\n");
    const [player, position] = fileHeader.split(",");
    if (player !== "Player" || position !== "Position") {
      throw new BadRequestException(`${player} - ${position}`);
    }
    const {
      players: allStagePlayers,
      rounds: allStageRounds,
      lobbies: allStageLobbies,
      lobbyGroups: allStageLobbyGroups,
    } = await this.stagesService.findOne(stageId, [
      "players",
      "rounds",
      "lobbies",
      "lobbyGroups",
    ]);

    if (lines.length % allStagePlayers.length !== 0) {
      throw new BadRequestException(
        "Number of lines does not match number of stage players",
      );
    }

    if (
      lines.length / allStagePlayers.length !== allStageLobbyGroups.length &&
      !lobbyGroupId
    ) {
      throw new BadRequestException(
        "Number of lines does not match number of lobby groups",
      );
    }

    const payloadWithPlayerId: BaseFileLine[] = lines.map((line) => {
      const [playerName, ...positions] = line.split(",");
      const player = allStagePlayers.find(
        (p) => p.player.name.toLowerCase() === playerName.toLowerCase(),
      );
      return {
        playerId: player.player.id,
        playerPositions: positions.map((p) => Number(p)),
      };
    });

    let count = 0;
    const roundsPerLobbyGroup = allStageLobbyGroups.reduce<{
      [lobbyGroupId: number]: Round[];
    }>((prev, curr) => {
      const roundCount = curr.roundsPlayed;
      const result = {
        [curr.id]: allStageRounds.slice(count, count + roundCount - 1),
      };
      count += roundCount;
      return {
        ...prev,
        ...result,
      };
    }, {});

    const lobbyToRoundMap = allStageLobbies.reduce<{
      [lobbyId: number]: number[];
    }>(
      (prev, curr) => ({
        ...prev,
        [curr.id]: roundsPerLobbyGroup[curr.lobbyGroupId].map((r) => r.id),
      }),
      {},
    );

    const resultsByLobby = chunk(payloadWithPlayerId, 8);

    const payloadWithPlayerAndLobby = resultsByLobby.reduce<
      FileLineWithLobby[]
    >(
      (prev, curr, index) => [
        ...prev,
        ...curr.map((a) => ({
          playerId: a.playerId,
          playerPositions: a.playerPositions,
          lobbyId: allStageLobbies[index].id,
        })),
      ],
      [],
    );

    const finalSimplePayload = payloadWithPlayerAndLobby.reduce<
      FileLineWithLobbyAndRound[]
    >((prev, curr, index) => {
      const newEntries: FileLineWithLobbyAndRound[] = curr.playerPositions.map(
        (position) => ({
          playerId: curr.playerId,
          lobbyId: curr.lobbyId,
          position,
          roundId: lobbyToRoundMap[curr.lobbyId][index],
        }),
      );
      return [...prev, ...newEntries];
    }, []);

    const playerLobbyCreationResult =
      await this.lobbyPlayerInfosService.createManyLobbyPlayers(
        finalSimplePayload.map((p) => ({
          playerId: p.playerId,
          lobbyId: p.lobbyId,
        })),
      );

    const finalPayload: FileLineWithPlayerLobby[] = finalSimplePayload.map(
      (p) => ({
        lobbyPlayerId: playerLobbyCreationResult.find(
          (r) => r.lobbyId === p.lobbyId && r.playerId === p.playerId,
        ).id,
        roundId: p.roundId,
        position: p.position,
      }),
    );

    const results = this.roundResultsRepository.save(finalPayload);

    return results;
  }

  public findResultsByStage(stageId: number): Promise<RoundResultsRaw[]> {
    return this.roundResultsRepository.manager
      .createQueryBuilder()
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
      .addSelect("COALESCE(spi.tiebreakerRanking, 0)", "tiebreakerRanking")
      .where("stage.id = :stageId", { stageId })
      .getRawMany();
  }

  public findResultsByLobbyGroup(
    lobbyGroupId: number,
  ): Promise<RoundResultsRaw[]> {
    return this.roundResultsRepository.manager
      .createQueryBuilder()
      .select(
        "result.roundId, result.position, lpi.id, lpi.playerId, round.sequence, player.name, player.region, player.country, points.points",
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
      .addSelect("COALESCE(spi.tiebreakerRanking, 0)", "tiebreakerRanking")
      .where("lobby.lobbyGroupId = :lobbyGroupId", { lobbyGroupId })
      .getRawMany();
  }

  public findStats({
    setId,
    skip,
    take = 10,
    region,
    tournamentIds,
    sort,
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
      .where('stats."totalGames" > 0')
      .orderBy(
        sort
          ? { [`stats.\"${sort.column}\"`]: sort.asc ? "ASC" : "DESC" }
          : { [`stats.\"averagePosition\"`]: "ASC" },
      )
      .take(take)
      .skip(skip)
      .getRawMany<PlayersStatsRaw>();
  }

  public findStatsByPlayer(
    playerId: number,
    setId?: number,
    tournamentId?: number,
  ): Promise<PlayerStatsRaw> {
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
      .getRawOne();
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
