import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PlayersStats } from "../players/dto/get-player-stats.out";
import { formatStats } from "../players/players.adapter";
import { StagesService } from "../stages/stages.service";
import { CreateLobbyResultArgs } from "./dto/create-lobby-result.args";
import { BooleanResult } from "./dto/create-lobby-result.out";
import { PlayerResults } from "./dto/get-results.out";
import { RoundResultsRaw } from "./dto/get-results.raw";
import { GetStatsArgs } from "./dto/get-stats.args";
import {
  formatResults,
  fromRawToConsolidatedRoundResults,
} from "./round-result.adapter";
import { RoundResult } from "./round-result.entity";
import { sortResults } from "./round-result.logic";
import { RoundResultsService } from "./round-results.service";

@Resolver(() => RoundResult)
export class RoundResultsResolver {
  constructor(
    private roundResultsService: RoundResultsService,
    private stagesService: StagesService,
  ) {}

  @Query(() => [PlayerResults])
  async resultsByStage(@Args("stageId", { type: () => Int }) stageId: number) {
    const { tiebreakers } = await this.stagesService.findOne(stageId);
    const results = await this.roundResultsService.findResultsByStage(stageId);
    const formattedResults = fromRawToConsolidatedRoundResults(results);
    return sortResults(formattedResults, tiebreakers);
  }

  @Query(() => [PlayersStats])
  async playerStats(@Args() args: GetStatsArgs) {
    const stats = await this.roundResultsService.findStats(args);
    const formatted: PlayersStats[] = stats.map(
      ({ id, name, region, country, ...stats }) => ({
        player: {
          id,
          name,
          region,
          country,
        },
        ...formatStats(stats),
      }),
    );
    return formatted;
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
