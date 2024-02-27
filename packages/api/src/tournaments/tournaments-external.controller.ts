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
  CreateTournamentStageSchema,
  CreateTournamentStageBodySchemaDto,
  CreateTournamentStageParamsSchemaDto,
} from "./schema/create-stage.schema";
import {
  CreateTournamentSchema,
  CreateTournamentSchemaDto,
} from "./schema/create-tournament.schema";
import { TournamentsExternalService } from "./services/tournaments-external.service";
import { TournamentsWriteService } from "./services/tournaments-write.service";

@Controller("tournaments")
export class TournamentsExternalController {
  constructor(
    private tournamentsWriteService: TournamentsWriteService,
    private tournamentsExternalService: TournamentsExternalService,
  ) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @UseInterceptors(new ValidationInterceptor(CreateTournamentSchema))
  createOne(@Body() body: CreateTournamentSchemaDto) {
    return this.tournamentsExternalService.createOne(body);
  }

  @Post("/:tournamentId/stages")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("x-api-key")
  @UseInterceptors(new ValidationInterceptor(CreateTournamentStageSchema))
  createStage(
    @Param() params: CreateTournamentStageParamsSchemaDto,
    @Body() body: CreateTournamentStageBodySchemaDto,
  ) {
    return this.tournamentsWriteService.createStage(params.tournamentId, body);
  }
}
