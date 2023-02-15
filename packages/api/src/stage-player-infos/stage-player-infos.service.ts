import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { parseFileString } from "../lib/FileParser";
import { parseMultilinePlayerNames } from "../lib/MultilineInput";
import {
  CreateStagePlayerArgs,
  CreateStagePlayerByNameArgs,
} from "../stages/dto/create-stage-player.args";
import { GetStagePlayerArgs } from "../stages/dto/get-stage-player.args";
import { UpdateStagePlayerArgs } from "../stages/dto/update-stage-player.args";
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

  async createStagePlayers({
    stageId,
    playerIds,
  }: CreateStagePlayerArgs): Promise<StagePlayerInfo[]> {
    const savePayload = playerIds.map((playerId) => ({
      stageId,
      playerId,
      extraPoints: 0,
      tiebreakerRanking: 0,
    })) as StagePlayerInfo[];
    return await this.stagePlayerInfoRepository.save(savePayload);
  }

  async createStagePlayerByName({
    stageId,
    playerNames,
  }: CreateStagePlayerByNameArgs): Promise<StagePlayerInfo[]> {
    const playerIds = await parseMultilinePlayerNames(
      playerNames,
      this.stagePlayerInfoRepository.manager,
    );

    return this.createStagePlayers({ stageId, playerIds });
  }

  async findOne({ stageId, playerId }: GetStagePlayerArgs) {
    return this.stagePlayerInfoRepository.findOne({
      where: {
        stageId,
        playerId,
      },
    });
  }

  async updateOne({
    stageId,
    playerId,
    tiebreakerRanking,
    extraPoints,
  }: UpdateStagePlayerArgs) {
    await this.stagePlayerInfoRepository.update(
      { stageId, playerId },
      { tiebreakerRanking, extraPoints },
    );
    return this.findOne({ stageId, playerId });
  }

  async createTiebreakerBulk(fileString: string, stageId: number) {
    const { titles, lines } = parseFileString(fileString);
    const [name, ranking] = titles;
    if (name !== "Name" || ranking !== "Ranking") {
      throw new BadRequestException(`${name} - ${ranking}`);
    }

    const stagePlayers = await this.findAllByStage(stageId);

    const fileData = lines.map((line) => {
      const [name, tiebreakerRanking] = line.split(",");
      return { name, tiebreakerRanking: Number(tiebreakerRanking) };
    });

    const resolvedInfo = stagePlayers.map((sp) => {
      const entry = fileData.find(
        (p) => p.name.toLowerCase() === sp.player.name.toLowerCase(),
      );
      return {
        player: sp.player,
        name: entry?.name,
        tiebreakerRanking: entry?.tiebreakerRanking,
      };
    });

    const notFoundPlayers = resolvedInfo.filter((info) => !info.name);

    if (notFoundPlayers.length) {
      throw new BadRequestException(
        `Names not found: ${notFoundPlayers
          .map((p) => p.player.name)
          .join(", ")}`,
      );
    }

    const updates = resolvedInfo.map((x) =>
      this.stagePlayerInfoRepository.update(
        { stageId, playerId: x.player.id },
        { tiebreakerRanking: x.tiebreakerRanking },
      ),
    );

    return Promise.all(updates);
  }
}
