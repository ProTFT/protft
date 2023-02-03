import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { BaseResolver } from "../lib/BaseResolver";
import { RoundResultsService } from "../round-results/round-results.service";
import { CreatePlayerArgs } from "./dto/create-player.args";
import { PlayerFilterMeta } from "./dto/get-player-filter-meta.out";
import { PlayerStats } from "./dto/get-player-stats.out";
import { GetPlayerArgs } from "./dto/get-players.args";
import { formatStats } from "./players.adapter";
import { Player } from "./player.entity";
import { PlayersService } from "./players.service";
import { Tournament } from "../tournaments/tournament.entity";
import { UseGuards } from "@nestjs/common";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { GetPlayerStatsArgs } from "./dto/get-player-stats.args";

@Resolver(() => Player)
export class PlayersResolver extends BaseResolver {
  constructor(
    private playersService: PlayersService,
    private roundResultsService: RoundResultsService,
  ) {
    super();
  }

  @ResolveField(() => PlayerStats)
  async playerStats(
    @Parent() player: Player,
    @Args() { setId, tournamentId }: GetPlayerStatsArgs,
  ): Promise<PlayerStats> {
    const rawStats = await this.roundResultsService.findStatsByPlayer(
      player.id,
      setId,
      tournamentId,
    );
    return formatStats(rawStats);
  }

  @Query(() => [Tournament])
  async tournamentsPlayed(@Args("playerId", { type: () => Int }) id: number) {
    return this.playersService.findTournamentsPlayed(id);
  }

  @Query(() => [Player])
  async players(
    @Args() { region, country, take, skip, searchQuery }: GetPlayerArgs,
  ) {
    const filters = this.cleanGraphQLFilters({ region, country, searchQuery });
    return this.playersService.findAll(filters, { take, skip });
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Player])
  async adminPlayers(
    @Args() { region, country, take, skip, searchQuery }: GetPlayerArgs,
  ) {
    const filters = this.cleanGraphQLFilters({ region, country, searchQuery });
    return this.playersService.adminFindAll(filters, { take, skip });
  }

  @Query(() => Player)
  async player(@Args("id", { type: () => Int }) id: number) {
    return this.playersService.findOne(id);
  }

  @Query(() => Player)
  async playerBySlug(@Args("slug") slug: string) {
    return this.playersService.findOneBySlug(slug);
  }

  @Query(() => PlayerFilterMeta)
  async playerFilterMeta(): Promise<PlayerFilterMeta> {
    const [possibleCountries, possibleRegions] = await Promise.all([
      this.playersService.findUniqueCountries(),
      this.playersService.findUniqueRegions(),
    ]);
    return {
      possibleCountries,
      possibleRegions,
    };
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Player)
  async createPlayer(@Args() { name, country, region }: CreatePlayerArgs) {
    const payload = { name, country, region };
    return this.playersService.createOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [Player])
  async createPlayerSlugs() {
    return this.playersService.createSlugs();
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Player)
  async deletePlayer(@Args("id", { type: () => Int }) id: number) {
    return this.playersService.deleteOne(id);
  }
}
