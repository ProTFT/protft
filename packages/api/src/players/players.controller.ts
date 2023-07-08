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
import { ApiExcludeEndpoint, ApiSecurity } from "@nestjs/swagger";
import { ApiKeyGuard } from "../auth/apikey.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PlayersService } from "./players.service";
import { CreatePlayerBodySchemaDto } from "./schema/create-player.schema";

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

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("x-api-key")
  createOne(@Body() body: CreatePlayerBodySchemaDto) {
    return this.playersService.createOne(body);
  }
}
