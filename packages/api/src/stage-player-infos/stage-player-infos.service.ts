import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { parseFileString } from "../lib/FileParser";
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
    const [firstTitle, secondTitle, thirdTitle] = titles;
    if (
      firstTitle !== "Name" ||
      secondTitle !== "Ranking" ||
      thirdTitle !== "ExtraPoints"
    ) {
      throw new BadRequestException(
        `${firstTitle} - ${secondTitle} - ${thirdTitle}`,
      );
    }

    const stagePlayers = await this.findAllByStage(stageId);

    const fileData = lines.map((line) => {
      const [name, tiebreakerRanking, extraPoints] = line.split(",");
      return {
        name,
        tiebreakerRanking: Number(tiebreakerRanking || 0),
        extraPoints: Number(extraPoints || 0),
      };
    });

    const resolvedInfo = stagePlayers.map((sp) => {
      const entry = fileData.find(
        (p) => p.name.toLowerCase() === sp.player.name.toLowerCase(),
      );
      return {
        player: sp.player,
        name: entry?.name,
        tiebreakerRanking: entry?.tiebreakerRanking,
        extraPoints: entry?.extraPoints,
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
        {
          ...(x.tiebreakerRanking > 0 && {
            tiebreakerRanking: x.tiebreakerRanking,
          }),
          ...(x.extraPoints > 0 && {
            extraPoints: x.extraPoints,
          }),
        },
      ),
    );

    return Promise.all(updates);
  }
}
