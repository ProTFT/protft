import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RawRoundResults } from "../lobbies/lobbies.service";
import { RoundResult } from "../lobbies/round-result.entity";
import { CreateStageArgs } from "./dto/create-stage.args";
import { Stage } from "./stage.entity";

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage) private stageRepository: Repository<Stage>,
  ) {}

  findAllByTournament(tournamentId: number): Promise<Stage[]> {
    return this.stageRepository.find({ where: { tournamentId } });
  }

  createOne(payload: CreateStageArgs): Promise<Stage> {
    return this.stageRepository.save(payload);
  }

  // Isso pode ser movido para uma entidade/service de round? E ser importado aq
  async findRoundCount(id: number): Promise<number> {
    const query = await this.stageRepository.findOne({
      where: { id },
      relations: ["rounds"],
    });
    return query.rounds.length;
  }

  // vai sair pra pegar do round result
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
