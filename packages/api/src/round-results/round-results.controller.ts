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
import { RoundResultsService } from "./round-results.service";

@Controller("roundResults")
@ApiExcludeController()
export class RoundResultsController {
  constructor(private roundResultsService: RoundResultsService) {}

  @Post("uploadBulk")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  uploadBulk(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    {
      stageId,
      ignorePlayerNumber = "false",
    }: { stageId: string; ignorePlayerNumber: string },
  ) {
    if (!file) {
      throw new BadRequestException("No file provided");
    }
    const fileString = file.buffer.toString("utf-8");
    return this.roundResultsService.createBulk(
      fileString,
      Number(stageId),
      ignorePlayerNumber === "true",
    );
  }
}
