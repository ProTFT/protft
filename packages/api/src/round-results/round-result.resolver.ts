import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StagesService } from "../stages/stages.service";
import { CreateLobbyResultArgs } from "./dto/create-lobby-result.args";
import { BooleanResult } from "./dto/create-lobby-result.out";
import { PlayerResults } from "./dto/get-results.out";
import { RoundResultsRaw } from "./dto/get-results.raw";
import {
  formatResults,
  fromRawToConsolidatedRoundResults,
} from "./round-result.adapter";
import { RoundResult } from "./round-result.entity";
import { sortResults } from "./round-result.logic";
import { RoundResultsFacade } from "./round-results.facade";
import { RoundResultsService } from "./round-results.service";

@Resolver(() => RoundResult)
export class RoundResultsResolver {
  constructor(
    private roundResultsFacade: RoundResultsFacade,
    private roundResultsService: RoundResultsService,
    private stagesService: StagesService,
  ) {}

  @Query(() => [PlayerResults])
  async resultsByStage(@Args("stageId", { type: () => Int }) stageId: number) {
    const { tiebreakers } = await this.stagesService.findOne(stageId);
    const results = await this.roundResultsService.findResultsByStage(stageId);
    return this.formatAndSort(results, tiebreakers);
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

  private formatAndSort(
    results: RoundResultsRaw[],
    tiebreakers: number[],
  ): PlayerResults[] {
    const formattedResults = fromRawToConsolidatedRoundResults(results);
    return sortResults(formattedResults, tiebreakers);
  }
}
