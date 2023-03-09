import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { DeleteResponse } from "../lib/dto/delete-return";
import { TournamentResult } from "./tournament-result.entity";
import { TournamentResultsService } from "./tournament-results.service";

@Resolver(() => TournamentResult)
export class TournamentResultsResolver {
  constructor(private tournamentResultsService: TournamentResultsService) {}

  @Query(() => [TournamentResult])
  async resultsOfTournament(
    @Args({ name: "tournamentId", type: () => Int }) tournamentId: number,
  ) {
    return this.tournamentResultsService.findAllByTournament(tournamentId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [TournamentResult])
  async lockTournament(@Args({ name: "id", type: () => Int }) id: number) {
    return this.tournamentResultsService.lockResults(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => DeleteResponse)
  deleteTournamentResults(@Args({ name: "id", type: () => Int }) id: number) {
    return this.tournamentResultsService.deleteResults(id);
  }
}
