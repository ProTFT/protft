import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Player } from "../players/player.entity";
import {
  CreateStagePlayerArgs,
  CreateStagePlayerByNameArgs,
} from "../stages/dto/create-stage-player.args";
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

  async createStagePlayerByName({
    stageId,
    playerNames,
  }: CreateStagePlayerByNameArgs): Promise<StagePlayerInfo[]> {
    const namesToFind = playerNames.replace(/\r/g, "").split("\n");
    const query = this.stagePlayerInfoRepository.manager
      .createQueryBuilder()
      .select("*")
      .from("player", "p");

    const queryWithAllConditions = namesToFind.reduce((prev, curr, index) => {
      if (index === 0) {
        return prev.where(`p.name = '${curr}'`);
      }
      return prev.orWhere(`p.name = '${curr}'`);
    }, query);

    const results =
      (await queryWithAllConditions.getRawMany()) as unknown as Player[];

    if (results.length !== namesToFind.length) {
      throw new BadRequestException(
        `Provided names: ${namesToFind.length}, names found: ${results.length}`,
      );
    }

    const playerIds = results.map((r) => r.id);

    return this.createStagePlayer({ stageId, playerIds });
  }
}
