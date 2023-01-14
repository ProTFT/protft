import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStagePlayerArgs } from "../stages/dto/create-stage-player.args";
import { StagePlayerInfo } from "./stage-player-info.entity";

@Injectable()
export class StagePlayerInfosService {
  constructor(
    @InjectRepository(StagePlayerInfo)
    private stagePlayerInfoRepository: Repository<StagePlayerInfo>,
  ) {}

  findAllByStage(stageId: number): Promise<StagePlayerInfo[]> {
    return this.stagePlayerInfoRepository.find({
      relations: ["player"],
      where: { stageId },
    });
  }

  async createStagePlayer({
    stageId,
    playerIds,
  }: CreateStagePlayerArgs): Promise<StagePlayerInfo[]> {
    const savePayload = playerIds.map((playerId) => ({
      stageId,
      playerId,
      extraPoints: 0,
      tiebreakerRanking: 0,
    })) as StagePlayerInfo[];
    return await this.stagePlayerInfoRepository.save(savePayload as any);
  }
}
