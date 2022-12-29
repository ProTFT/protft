import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { SetsService } from "../sets/sets.service";
import { StagesService } from "../stages/stages.service";
import { DeepTournamentInput } from "./dto/create-deep-tournament.args";
import { CreateTournamentArgs } from "./dto/create-tournament.args";
import { TournamentOverview } from "./dto/get-tournament-overview.out";
import { Tournament } from "./tournament.entity";
import { TournamentsService } from "./tournaments.service";

@Resolver(() => Tournament)
export class TournamentsResolver {
  constructor(
    private tournamentsService: TournamentsService,
    private setService: SetsService,
    private stagesService: StagesService,
  ) {}

  @Query(() => [Tournament])
  async tournaments(
    @Args("searchQuery", { nullable: true }) searchQuery?: string,
  ) {
    return this.tournamentsService.findAll(searchQuery);
  }

  @Query(() => Tournament)
  async tournament(@Args("id", { type: () => Int }) id: number) {
    return this.tournamentsService.findOne(id);
  }

  @Query(() => TournamentOverview)
  async tournamentOverview() {
    const [pastTournaments, liveTournaments, upcomingTournaments] =
      await Promise.all([
        this.tournamentsService.findPast(),
        this.tournamentsService.findLive(),
        this.tournamentsService.findUpcoming(),
      ]);
    return {
      pastTournaments,
      liveTournaments,
      upcomingTournaments,
    };
  }

  @ResolveField()
  async set(@Parent() tournament: Tournament) {
    const { setId } = tournament;
    return this.setService.findOne(setId);
  }

  @ResolveField()
  async stages(@Parent() tournament: Tournament) {
    const { id } = tournament;
    return this.stagesService.findAllByTournament(id);
  }

  @Mutation(() => Tournament)
  async createTournament(
    @Args()
    {
      name,
      region,
      host,
      participantsNumber,
      prizePool,
      startDate,
      endDate,
      setId,
    }: CreateTournamentArgs,
  ) {
    const payload = {
      name,
      region,
      host,
      participantsNumber,
      prizePool,
      startDate,
      endDate,
      setId,
    };
    return this.tournamentsService.createOne(payload);
  }

  @Mutation(() => Tournament)
  async createDeepTournament(
    @Args({ name: "tournament", type: () => DeepTournamentInput })
    tournament: DeepTournamentInput,
  ) {
    return this.tournamentsService.createDeepOne(tournament);
  }
}
