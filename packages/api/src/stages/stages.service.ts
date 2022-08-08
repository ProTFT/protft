import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MutationPayload } from "../lib/types";
import { RawRoundResults } from "../lobbies/lobbies.service";
import { RoundResult } from "../lobbies/round-result.entity";
import { Stage } from "./stage.entity";

type CreateStagePayload = MutationPayload<
  Stage,
  "pointSchemaId" | "name" | "sequence" | "isFinal"
>;

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage) private stageRepository: Repository<Stage>,
  ) {}

  findAllByTournament(tournamentId: number): Promise<Stage[]> {
    return this.stageRepository.find({ where: { tournamentId } });
  }

  createOne(payload: CreateStagePayload): Promise<Stage> {
    return this.stageRepository.save(payload);
  }

  async findRoundCount(id: number): Promise<number> {
    const query = await this.stageRepository.findOne({
      where: { id },
      relations: ["rounds"],
    });
    return query.rounds.length;
  }

  getConsolidatedResults(stageId: number): Promise<RawRoundResults[]> {
    return this.stageRepository
      .createQueryBuilder("stage")
      .select(
        "result.roundId, result.position, result.playerId, round.sequence, player.name, player.region, player.country, points.points",
      )
      .innerJoin("lobby", "lobby", "lobby.stageId = stage.id")
      .innerJoin(RoundResult, "result", "lobby.id = result.lobbyId")
      .innerJoin("result.player", "player")
      .innerJoin(
        "points",
        "points",
        "points.pointSchemaId = stage.pointSchemaId and points.position = result.position",
      )
      .innerJoin("result.round", "round")
      .where("stage.id = :stageId", { stageId })
      .orderBy("result.playerId, round.sequence")
      .execute();
  }
}
