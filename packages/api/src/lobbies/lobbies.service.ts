import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MutationPayload } from "../lib/types";
import { Player } from "../players/player.entity";
import { Points } from "../points/point.entity";
import { Lobby } from "./lobby.entity";
import { RoundResult } from "./round-result.entity";
import { Round } from "./round.entity";

type CreateLobbyPayload = MutationPayload<
  Lobby,
  "stageId" | "name" | "sequence"
>;

type CreateRoundPayload = MutationPayload<Round, "sequence">;

export type RawRoundResults = Pick<
  RoundResult,
  "roundId" | "position" | "playerId"
> &
  Pick<Player, "name" | "region" | "country"> &
  Pick<Points, "points"> &
  Pick<Round, "sequence">;

export interface RawPlayerStats {
  averagePosition: string;
  totalGames: string;
  topFourCount: string;
  topOneCount: string;
  eigthCount: string;
}

@Injectable()
export class LobbiesService {
  constructor(
    @InjectRepository(Lobby) private lobbiesRepository: Repository<Lobby>,
    @InjectRepository(RoundResult)
    private roundResultsRepository: Repository<RoundResult>,
    @InjectRepository(Round)
    private roundsRepository: Repository<Round>,
  ) {}

  findOne(lobbyId: number): Promise<Lobby> {
    return this.lobbiesRepository.findOne(lobbyId, {
      relations: ["players"],
    });
  }

  findAllByStage(stageId: number): Promise<Lobby[]> {
    return this.lobbiesRepository.find({ where: { stageId } });
  }

  findRoundByStage(stageId: number): Promise<Round[]> {
    return this.roundsRepository.find({
      where: { stageId },
      order: { sequence: "ASC" },
    });
  }

  async findRoundCount(lobbyId: number): Promise<number> {
    const { count } = await this.roundResultsRepository
      .createQueryBuilder()
      .select(`COUNT(DISTINCT("roundId"))`, "count")
      .where({ lobbyId })
      .getRawOne<{ count: number }>();
    return count;
  }

  async findStatsByPlayer(playerId: number): Promise<RawPlayerStats> {
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

  createOne(payload: CreateLobbyPayload): Promise<Lobby> {
    return this.lobbiesRepository.save(payload);
  }

  createOneRound(payload: CreateRoundPayload): Promise<Round> {
    return this.roundsRepository.save(payload);
  }

  createResults(results: RoundResult[]): Promise<any> {
    return this.roundResultsRepository.save(results);
  }

  async createPlayerLobby(payload: any): Promise<any> {
    const { lobbyId, playerIds } = payload;
    const lobby = await this.lobbiesRepository.findOne(lobbyId);
    const playerObjects = playerIds.map((id: number) => ({
      id,
    }));
    lobby.players = playerObjects;
    return this.lobbiesRepository.save(lobby);
  }

  findLobbyResults(lobbyId: number): Promise<RawRoundResults[]> {
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
      .where("result.lobbyId = :lobbyId", { lobbyId })
      .orderBy("result.playerId, round.sequence")
      .execute();
  }
}
