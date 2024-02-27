import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Qualification } from "./qualification.entity";

type QualificationRelationships = "tournamentToQualify" | "stageToQualify";

@Injectable()
export class QualificationService {
  constructor(
    @InjectRepository(Qualification)
    private qualificationRepository: Repository<Qualification>,
  ) {}

  findAllByStage(
    stageId: number,
    relations: QualificationRelationships[] = [],
  ): Promise<Qualification[]> {
    return this.qualificationRepository.find({
      where: {
        stageId,
      },
      relations,
    });
  }
}
