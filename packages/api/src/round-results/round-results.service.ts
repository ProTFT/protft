import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { PlayerStatsRaw } from "./dto/get-player-stats.raw";
import { RoundResultsRaw } from "./dto/get-results.raw";
import { RoundResult } from "./round-result.entity";

@Injectable()
export class RoundResultsService {
  constructor(
    @InjectRepository(RoundResult)
    private roundResultsRepository: Repository<RoundResult>,
  ) {}

  async findRoundCount(lobbyId: number): Promise<number> {
    const { count } = await this.roundResultsRepository
      .createQueryBuilder()
      .select(`COUNT(DISTINCT("roundId"))`, "count")
      .where({ lobbyId })
      .getRawOne<{ count: number }>();
    return count;
  }

  async findStatsByPlayer(playerId: number): Promise<PlayerStatsRaw> {
    return this.roundResultsRepository
      .createQueryBuilder()
      .select(`COALESCE(AVG(position),0)`, "averagePosition")
      .addSelect(`COUNT(*)`, "totalGames")
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
      )
      .where({ playerId })
      .getRawOne();
  }

  createResults(results: RoundResult[]): Promise<RoundResult[]> {
    return this.roundResultsRepository.save(results);
  }

  findResultsByLobby(lobbyId: number): Promise<RoundResultsRaw[]> {
    return this.baseResultQuery()
      .where("result.lobbyId = :lobbyId", { lobbyId })
      .execute();
  }

  findResultsByStage(stageId: number): Promise<RoundResultsRaw[]> {
    return this.baseResultQuery()
      .where("stage.id = :stageId", { stageId })
      .execute();
  }

  private baseResultQuery(): SelectQueryBuilder<RoundResult> {
    return this.roundResultsRepository
      .createQueryBuilder("result")
      .select(
        "result.roundId, result.position, result.playerId, round.sequence, player.name, player.region, player.country, points.points",
      )
      .innerJoin("result.lobby", "lobby")
      .innerJoin("result.player", "player")
      .innerJoin("stage", "stage", "stage.id = lobby.stageId")
      .innerJoin(
        "points",
        "points",
        "points.pointSchemaId = stage.pointSchemaId and points.position = result.position",
      )
      .innerJoin("result.round", "round")
      .orderBy("result.playerId, round.sequence");
  }
}
