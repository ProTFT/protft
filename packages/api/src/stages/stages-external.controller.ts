import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiSecurity } from "@nestjs/swagger";
import { ApiKeyGuard } from "../auth/apikey.guard";
import { ValidationInterceptor } from "../lib/joi/validation.interceptor";
import {
  GenerateLobbiesBodySchemaDto,
  GenerateLobbiesParamsSchemaDto,
  GenerateLobbiesSchema,
} from "./schema/generate-lobbies.schema";
import { StagesService } from "./stages.service";

@Controller("stages")
export class StagesExternalController {
  constructor(private stagesService: StagesService) {}

  @Post("/:stageId/generateLobbies")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("x-api-key")
  @UseInterceptors(new ValidationInterceptor(GenerateLobbiesSchema))
  async generateLobbies(
    @Param() { stageId }: GenerateLobbiesParamsSchemaDto,
    @Body() { roundsUntilReseed }: GenerateLobbiesBodySchemaDto,
  ) {
    const { players } = await this.stagesService.findOne(stageId, ["players"]);
    return this.stagesService.generateLobbies(
      stageId,
      roundsUntilReseed,
      players.length,
    );
  }
}
