import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiExcludeController } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { StagePlayerInfosService } from "./stage-player-infos.service";

@Controller("stagePlayerInfos")
@ApiExcludeController()
export class StagePlayerInfosController {
  constructor(private stagePlayerInfosService: StagePlayerInfosService) {}

  @Post("uploadTiebreakerListBulk")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  uploadBulk(
    @UploadedFile() file: Express.Multer.File,
    @Body() { stageId }: { stageId: string },
  ) {
    if (!file) {
      throw new BadRequestException("No file provided");
    }
    const fileString = file.buffer.toString("utf-8");
    return this.stagePlayerInfosService.createTiebreakerBulk(
      fileString,
      Number(stageId),
    );
  }
}
