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
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PlayersService } from "./players.service";

@Controller("players")
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Post("uploadBulk")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  @ApiExcludeEndpoint()
  uploadBulk(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { dryRun: string },
  ) {
    if (!file) {
      throw new BadRequestException("No file provided");
    }
    const isRealRun = body.dryRun === "false";
    const fileString = file.buffer.toString("utf-8");
    return this.playersService.createBulk(fileString, !isRealRun);
  }
}
