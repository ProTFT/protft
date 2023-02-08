import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { PlayerWithStats } from "../players/dto/get-player-stats.out";
import { CreateLobbyGroupResultArgs } from "./dto/create-lobby-group-result.args";
import { PlayerResults } from "./dto/get-results.out";
import { GetStatsArgs } from "./dto/get-stats.args";
import { RoundResult } from "./round-result.entity";
import { RoundResultsService } from "./round-results.service";

@Resolver(() => RoundResult)
export class RoundResultsResolver {
  constructor(private roundResultsService: RoundResultsService) {}

  @Query(() => [PlayerResults])
  resultsByStage(@Args("stageId", { type: () => Int }) stageId: number) {
    return this.roundResultsService.resultsByStage(stageId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [PlayerResults])
  resultsByLobbyGroup(
    @Args("lobbyGroupId", { type: () => Int }) lobbyGroupId: number,
  ) {
    return this.roundResultsService.resultsByLobbyGroup(lobbyGroupId);
  }

  @Query(() => [PlayerWithStats])
  playerStats(@Args() args: GetStatsArgs) {
    return this.roundResultsService.playerStats(args);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [RoundResult])
  async createLobbyGroupResult(
    @Args() { lobbyGroupId, results }: CreateLobbyGroupResultArgs,
  ) {
    return this.roundResultsService.createResults({ lobbyGroupId, results });
  }
}
