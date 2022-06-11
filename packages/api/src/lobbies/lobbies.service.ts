import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Player } from "../players/player.entity";
import { Points } from "../points/point.entity";
import { Lobby } from "./lobby.entity";
import { RoundResult } from "./round-result.entity";
import { Round } from "./round.entity";

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

  findAllByStage(stageId: number): Promise<Lobby[]> {
    return this.lobbiesRepository.find({ where: { stageId } });
  }

  findRoundCount(lobbyId: number): Promise<number> {
    return this.roundsRepository.count({ where: { lobbyId } });
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
