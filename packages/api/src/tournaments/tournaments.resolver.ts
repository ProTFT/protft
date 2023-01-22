import { UseGuards } from "@nestjs/common";
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { SetsService } from "../sets/sets.service";
import { StagesService } from "../stages/stages.service";
import { CreateTournamentArgs } from "./dto/create-tournament.args";
import { TournamentOverview } from "./dto/get-tournament-overview.out";
import { Tournament } from "./tournament.entity";
import { TournamentsService } from "./tournaments.service";
import { DeleteResponse } from "../lib/dto/delete-return";
import { UpdateTournamentArgs } from "./dto/update-tournament.args";
import { CreateTournamentPlayerArgs } from "./dto/create-tournament-player.args";
import { Player } from "../players/player.entity";

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

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Tournament])
  async adminTournaments(
    @Args("searchQuery", { nullable: true }) searchQuery?: string,
  ) {
    return this.tournamentsService.findAdminAll(searchQuery);
  }

  @Query(() => Tournament)
  async tournament(@Args("id", { type: () => Int }) id: number) {
    return this.tournamentsService.findOne(id);
  }

  @Query(() => Tournament)
  async tournamentBySlug(@Args("slug") slug: string) {
    return this.tournamentsService.findOneBySlug(slug);
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

  @ResolveField()
  async players(@Parent() tournament: Tournament): Promise<Player[]> {
    const tournamentWithPlayers =
      await this.tournamentsService.findOneWithPlayers(tournament.id);
    return tournamentWithPlayers.players;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Tournament)
  async createTournament(@Args() payload: CreateTournamentArgs) {
    return this.tournamentsService.createOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Tournament)
  async updateTournament(@Args() payload: UpdateTournamentArgs) {
    return this.tournamentsService.updateOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => DeleteResponse)
  async deleteTournament(@Args({ name: "id", type: () => Int }) id: number) {
    return this.tournamentsService.deleteOne(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Tournament)
  async createTournamentPlayers(
    @Args() { tournamentId, playerIds }: CreateTournamentPlayerArgs,
  ) {
    const payload = { tournamentId, playerIds };
    return this.tournamentsService.createTournamentPlayer(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [Tournament])
  async createTournamentSlugs() {
    return this.tournamentsService.createSlugs();
  }
}
