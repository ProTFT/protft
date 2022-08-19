import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStageArgs } from "./dto/create-stage.args";
import { Stage } from "./stage.entity";

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage) private stageRepository: Repository<Stage>,
  ) {}

  findOne(id: number): Promise<Stage> {
    return this.stageRepository.findOne(id);
  }

  findAllByTournament(tournamentId: number): Promise<Stage[]> {
    return this.stageRepository.find({
      where: { tournamentId },
      order: { sequence: "ASC" },
    });
  }

  createOne(payload: CreateStageArgs): Promise<Stage> {
    return this.stageRepository.save(payload);
  }
}
