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
import { CreatePlayerArgs } from "./dto/create-player.args";
import { PlayerFilterMeta } from "./dto/get-player-filter-meta.out";
import { GetPlayerArgs } from "./dto/get-players.args";
import { Player, PlayerCalculatedStats } from "./player.entity";
import { PlayersService } from "./players.service";
import { UseGuards } from "@nestjs/common";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { GetPlayerStatsArgs } from "./dto/get-player-stats.args";
import { TournamentsPlayed } from "./dto/get-tournaments-played.out";
import { UpdatePlayerArgs } from "./dto/update-player.args";

@Resolver(() => Player)
export class PlayersResolver extends BaseResolver {
  constructor(private playersService: PlayersService) {
    super();
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
    return this.playersService.findAll(filters, { take, skip }, { id: "DESC" });
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

  @ResolveField()
  async playerStats(
    @Parent() player: Player,
    @Args() { setId, tournamentId }: GetPlayerStatsArgs,
  ): Promise<PlayerCalculatedStats> {
    return this.playersService.getPlayerStats(player, setId, tournamentId);
  }

  @Query(() => [TournamentsPlayed])
  async tournamentsPlayed(@Args("playerId", { type: () => Int }) id: number) {
    return this.playersService.findTournamentsPlayed(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Player)
  async createPlayer(
    @Args() { name, country, region, alias }: CreatePlayerArgs,
  ) {
    const payload = { name, country, region, alias };
    return this.playersService.createOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Player)
  async updatePlayer(@Args() { id, ...player }: UpdatePlayerArgs) {
    return this.playersService.updateOne(id, player);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [Player])
  async createPlayerSlugs() {
    return this.playersService.createMissingSlugs();
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Player)
  async deletePlayer(@Args("id", { type: () => Int }) id: number) {
    return this.playersService.deleteOne(id);
  }

  // @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Player)
  async mergePlayer(
    @Args("playerIdToMaintain", { type: () => Int }) playerIdToMaintain: number,
    @Args("playerIdToRemove", { type: () => Int }) playerIdToRemove: number,
  ) {
    return this.playersService.merge(playerIdToMaintain, playerIdToRemove);
  }
}
