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

  findAllByTournament(tournamentId: number): Promise<Stage[]> {
    return this.stageRepository.find({ where: { tournamentId } });
  }

  createOne(payload: CreateStageArgs): Promise<Stage> {
    return this.stageRepository.save(payload);
  }
}
