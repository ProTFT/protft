import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { DeleteResponse } from "../lib/dto/delete-return";
import { CreateStreamArgs } from "./dto/create-stream.args";
import { DeleteStreamArgs } from "./dto/delete-stream.args";
import { TournamentStream } from "./tournament-stream.entity";
import { TournamentStreamsService } from "./tournament-streams.service";

@Resolver(() => TournamentStream)
export class TournamentStreamsResolver {
  constructor(private tournamentStreamsService: TournamentStreamsService) {}

  @Query(() => [TournamentStream])
  async streamsOfTournament(
    @Args({ name: "tournamentId", type: () => Int }) tournamentId: number,
  ) {
    return this.tournamentStreamsService.findStreamsByTournament(tournamentId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => TournamentStream)
  async addTournamentStream(
    @Args({ type: () => CreateStreamArgs })
    stream: TournamentStream,
  ) {
    return this.tournamentStreamsService.addStream(stream);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => DeleteResponse)
  async deleteTournamentStream(
    @Args({ type: () => DeleteStreamArgs })
    { tournamentId, name }: DeleteStreamArgs,
  ) {
    return this.tournamentStreamsService.deleteStream(tournamentId, name);
  }
}
