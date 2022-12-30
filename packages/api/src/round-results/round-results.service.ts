import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { PlayersStatsRaw, PlayerStatsRaw } from "./dto/get-player-stats.raw";
import { RoundResultsRaw } from "./dto/get-results.raw";
import { GetStatsArgs } from "./dto/get-stats.args";
import { RoundResult } from "./round-result.entity";

@Injectable()
export class RoundResultsService {
  constructor(
    @InjectRepository(RoundResult)
    private roundResultsRepository: Repository<RoundResult>,
  ) {}

  public createResults(results: RoundResult[]): Promise<RoundResult[]> {
    return this.roundResultsRepository.save(results);
  }

  public findResultsByStage(stageId: number): Promise<RoundResultsRaw[]> {
    return this.roundResultsRepository.manager
      .createQueryBuilder()
      .select(
        "result.roundId, result.position, lpp.playerId, round.sequence, player.name, player.region, player.country, points.points",
      )
      .from("lobby_players_player", "lpp")
      .innerJoin("lobby", "lobby", "lobby.id = lpp.lobbyId")
      .innerJoin("stage", "stage", "stage.id = lobby.stageId")
      .innerJoin("player", "player", "player.id = lpp.playerId")
      .leftJoin(
        "round_result",
        "result",
        "lpp.lobbyId = result.lobbyId and lpp.playerId = result.playerId",
      )
      .leftJoin(
        "points",
        "points",
        "points.pointSchemaId = stage.pointSchemaId and points.position = result.position",
      )
      .leftJoin("round", "round", "round.id = result.roundId")
      .orderBy("lpp.playerId, round.sequence")
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

  public findStats({
    setId,
    skip,
    take = 10,
    region,
  }: Partial<GetStatsArgs>): Promise<PlayersStatsRaw[]> {
    return this.roundResultsRepository.manager
      .createQueryBuilder()
      .select("*")
      .from((subquery) => {
        const baseQuery = this.getBaseStatsQuery(subquery);
        let query = baseQuery
          .addSelect("player.*")
          .from("round_result", "result")
          .innerJoin("player", "player", "player.id = result.playerId")
          .groupBy("player.id");

        if (region) {
          query = query.andWhere("player.region = :region", { region });
        }

        if (setId) {
          return this.filterBySet(query, setId);
        }
        return query;
      }, "stats")
      .where('stats."totalGames" > 0')
      .orderBy('"averagePosition"', "ASC")
      .take(take)
      .skip(skip)
      .getRawMany<PlayersStatsRaw>();
  }

  public findStatsByPlayer(
    playerId: number,
    setId?: number,
  ): Promise<PlayerStatsRaw> {
    const queryBuilder =
      this.roundResultsRepository.createQueryBuilder("result");

    const query = this.getBaseStatsQuery(queryBuilder).where({ playerId });

    if (setId) {
      return this.filterBySet(queryBuilder, setId).getRawOne();
    }
    return query.getRawOne();
  }

  private getBaseStatsQuery(
    queryBuilder: SelectQueryBuilder<any>,
  ): SelectQueryBuilder<any> {
    return queryBuilder
      .select(`COUNT(*)`, "totalGames")
      .addSelect(`COALESCE(AVG(position),0)`, "averagePosition")
      .addSelect(
        `COALESCE(SUM(CASE WHEN position <= 4 THEN 1 ELSE 0 END),0)`,
        "topFourCount",
      )
      .addSelect(
        `COALESCE(SUM(CASE WHEN position = 1 THEN 1 ELSE 0 END),0)`,
        "topOneCount",
      )
      .addSelect(
        `COALESCE(SUM(CASE WHEN position = 8 THEN 1 ELSE 0 END),0)`,
        "eigthCount",
      );
  }

  private filterBySet(
    queryBuilder: SelectQueryBuilder<any>,
    setId: number,
  ): SelectQueryBuilder<any> {
    return queryBuilder
      .innerJoin("lobby", "lobby", "lobby.id = result.lobbyId")
      .innerJoin("stage", "stage", "stage.id = lobby.stageId")
      .innerJoin(
        "tournament",
        "tournament",
        "tournament.id = stage.tournamentId",
      )
      .andWhere("tournament.setId = :setId", { setId });
  }
}
