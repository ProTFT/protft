import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateLobbyResultArgs } from "./dto/create-lobby-result.args";
import { BooleanResult } from "./dto/create-lobby-result.out";
import { PlayerResults } from "./dto/get-results.out";
import { formatResults } from "./round-result.adapter";
import { RoundResult } from "./round-result.entity";
import { RoundResultsFacade } from "./round-results.facade";
import { RoundResultsService } from "./round-results.service";

@Resolver(() => RoundResult)
export class RoundResultsResolver {
  constructor(
    private roundResultsFacade: RoundResultsFacade,
    private roundResultsService: RoundResultsService,
  ) {}

  @Query(() => [PlayerResults])
  async resultsByStage(@Args("stageId", { type: () => Int }) stageId: number) {
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    return this.roundResultsFacade.findResultsByStage(stageId);
  }

  @Query(() => [PlayerResults])
  async resultsByLobby(@Args("lobbyId", { type: () => Int }) lobbyId: number) {
    return this.roundResultsFacade.findResultsByLobby(lobbyId);
  }

  @Mutation(() => BooleanResult)
  async createLobbyResult(@Args() args: CreateLobbyResultArgs) {
    const positionInputs = formatResults(args);
    try {
      await this.roundResultsService.createResults(positionInputs);
      return { result: true };
    } catch (error) {
      return { result: false, error: String(error) };
    }
  }
}
