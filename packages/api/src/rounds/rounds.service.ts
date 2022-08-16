import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoundArgs } from "./dto/create-round.args";
import { Round } from "./round.entity";

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round)
    private roundsRepository: Repository<Round>,
  ) {}

  findByStage(stageId: number): Promise<Round[]> {
    return this.roundsRepository.find({
      where: { stageId },
      order: { sequence: "ASC" },
    });
  }

  countByStage(stageId: number): Promise<number> {
    return this.roundsRepository.count({ where: { stageId } });
  }

  createOne(payload: CreateRoundArgs): Promise<Round> {
    return this.roundsRepository.save(payload);
  }
}
