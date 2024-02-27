import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiSecurity } from "@nestjs/swagger";
import { ApiKeyGuard } from "../auth/apikey.guard";
import { ValidationInterceptor } from "../lib/joi/validation.interceptor";
import { PlayersService } from "./players.service";
import {
  CreatePlayerBodySchemaDto,
  CreatePlayerSchema,
} from "./schema/create-player.schema";

@Controller("players")
export class PlayersExternalController {
  constructor(private playersService: PlayersService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("x-api-key")
  @UseInterceptors(new ValidationInterceptor(CreatePlayerSchema))
  createOne(@Body() body: CreatePlayerBodySchemaDto) {
    return this.playersService.createOne(body);
  }
}
