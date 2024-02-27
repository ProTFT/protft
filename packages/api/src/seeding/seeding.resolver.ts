import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import { SeedingService } from "./seeding.service";
import { SnakeSeedArgs } from "../lobbies/dto/snake-seed.args";

@Resolver()
export class SeedingResolver {
  constructor(private seedingService: SeedingService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [LobbyPlayerInfo])
  async snakeSeed(
    @Args()
    { stageId, lobbyGroupId, type }: SnakeSeedArgs,
  ) {
    return this.seedingService.snakeSeed(lobbyGroupId, stageId, type);
  }
}
