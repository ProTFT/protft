import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { ApiSecurity } from "@nestjs/swagger";
import { ApiKeyGuard } from "../auth/apikey.guard";
import { ValidationInterceptor } from "../lib/joi/validation.interceptor";
import { JoiValidationPipe } from "../lib/pipe/JoiPipe";
import {
  CreateTournamentStageSchema,
  CreateTournamentStageBodySchemaDto,
  CreateTournamentStageParamsSchemaDto,
} from "./schema/create-stage.schema";
import {
  CreateTournamentSchema,
  CreateTournamentSchemaDto,
} from "./schema/create-tournament.schema";
import { TournamentsService } from "./tournaments.service";

@Controller("tournaments")
export class TournamentsController {
  constructor(private tournamentsService: TournamentsService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @UsePipes(new JoiValidationPipe(CreateTournamentSchema))
  createOne(@Body() body: CreateTournamentSchemaDto) {
    return this.tournamentsService.createOne(body);
  }

  @Post("/:tournamentId/stages")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("x-api-key")
  @UseInterceptors(new ValidationInterceptor(CreateTournamentStageSchema))
  createStage(
    @Param() params: CreateTournamentStageParamsSchemaDto,
    @Body() body: CreateTournamentStageBodySchemaDto,
  ) {
    return this.tournamentsService.createStage(params.tournamentId, body);
  }
}
