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
    return this.lobbiesRepository.findOne(lobbyId, { relations: ["players"] });
  }

  findAllByStage(stageId: number): Promise<Lobby[]> {
    return this.lobbiesRepository.find({ where: { stageId } });
  }

  findRoundByStage(stageId: number): Promise<Round[]> {
    return this.roundsRepository.find({ where: { stageId } });
  }

  findRoundCount(lobbyId: number): Promise<number> {
    return this.roundsRepository.count({ where: { lobbyId } });
  }

  createOne(payload: CreateLobbyPayload): Promise<Lobby> {
    return this.lobbiesRepository.save(payload);
  }

  createOneRound(payload: CreateRoundPayload): Promise<Round> {
    return this.roundsRepository.save(payload);
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
      .innerJoin("result.player", "player")
      .innerJoin("result.stage", "stage")
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
