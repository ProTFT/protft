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
import { Tournament } from "./tournament.entity";
import { TournamentsService } from "./tournaments.service";
import { DeleteResponse } from "../lib/dto/delete-return";
import { UpdateTournamentArgs } from "./dto/update-tournament.args";
import {
  CreateTournamentPlayerArgs,
  CreateTournamentPlayerByNameArgs,
} from "./dto/create-tournament-player.args";
import { Player } from "../players/player.entity";
import { GetTournamentsArgs } from "./dto/get-tournaments.args";
import { BaseResolver } from "../lib/BaseResolver";

@Resolver(() => Tournament)
export class TournamentsResolver extends BaseResolver {
  constructor(
    private tournamentsService: TournamentsService,
    private setService: SetsService,
    private stagesService: StagesService,
  ) {
    super();
  }

  @Query(() => [Tournament])
  async tournaments(
    @Args() { region, setId, take, skip, searchQuery }: GetTournamentsArgs,
  ) {
    const filters = this.cleanGraphQLFilters({ region, setId, searchQuery });
    return this.tournamentsService.findAll({ ...filters }, { take, skip });
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Tournament])
  async adminTournaments(
    @Args() { region, setId, take, skip, searchQuery }: GetTournamentsArgs,
  ) {
    const filters = this.cleanGraphQLFilters({ region, setId, searchQuery });
    return this.tournamentsService.findAll(
      { ...filters },
      { take, skip },
      false,
    );
  }

  @Query(() => Tournament)
  async tournament(@Args("id", { type: () => Int }) id: number) {
    return this.tournamentsService.findOne(id);
  }

  @Query(() => Tournament)
  async tournamentBySlug(@Args("slug") slug: string) {
    return this.tournamentsService.findOneBySlug(slug);
  }

  @Query(() => [Tournament])
  async ongoingTournaments() {
    return this.tournamentsService.findOngoing();
  }

  @Query(() => [Tournament])
  async upcomingTournaments(
    @Args() { region, setId, take, skip, searchQuery }: GetTournamentsArgs,
  ) {
    const filters = this.cleanGraphQLFilters({ region, setId, searchQuery });
    return this.tournamentsService.findUpcoming({ ...filters }, { take, skip });
  }

  @Query(() => [Tournament])
  async pastTournaments(
    @Args() { region, setId, take, skip, searchQuery }: GetTournamentsArgs,
  ) {
    const filters = this.cleanGraphQLFilters({ region, setId, searchQuery });
    return this.tournamentsService.findPast({ ...filters }, { take, skip });
  }

  @Query(() => [Tournament])
  async tournamentsWithStats() {
    return this.tournamentsService.findWithStats();
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
    const tournamentWithPlayers = await this.tournamentsService.findOne(
      tournament.id,
      ["players"],
    );
    return tournamentWithPlayers.players;
  }

  @ResolveField()
  async nextStartTime(@Parent() tournament: Tournament): Promise<number> {
    return this.tournamentsService.findNextStageStartTime(tournament);
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
    return this.tournamentsService.createTournamentPlayers(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Tournament)
  async createTournamentPlayersByName(
    @Args() { tournamentId, playerNames }: CreateTournamentPlayerByNameArgs,
  ) {
    const payload = { tournamentId, playerNames };
    return this.tournamentsService.createTournamentPlayersByName(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [Tournament])
  async createTournamentSlugs() {
    return this.tournamentsService.createMissingSlugs();
  }
}
