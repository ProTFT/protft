import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MutationPayload } from "../lib/types";
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
}
