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
import { LobbiesService } from "../lobbies/lobbies.service";
import { CreatePlayerArgs } from "./dto/create-player.args";
import { PlayerFilterMeta } from "./dto/get-player-filter-meta.out";
import { PlayerStats } from "./dto/get-player-stats.out";
import { GetPlayerArgs } from "./dto/get-players.args";
import { formatStats } from "./player.adapter";
import { Player } from "./player.entity";
import { PlayersService } from "./players.service";

@Resolver(() => Player)
export class PlayersResolver extends BaseResolver {
  constructor(
    private playersService: PlayersService,
    private lobbiesService: LobbiesService,
  ) {
    super();
  }

  // vai mudar para pegar do round results
  @ResolveField(() => PlayerStats)
  async playerStats(@Parent() player: Player): Promise<PlayerStats> {
    const rawStats = await this.lobbiesService.findStatsByPlayer(player.id);
    return formatStats(rawStats);
  }

  @Query(() => [Player])
  async players(@Args() { region, country }: GetPlayerArgs) {
    const filters = this.cleanGraphQLFilters({ region, country });
    return this.playersService.findAll(filters);
  }

  @Query(() => Player)
  async player(@Args("id", { type: () => Int }) id: number) {
    return this.playersService.findOne(id);
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

  @Mutation(() => Player)
  async createPlayer(@Args() { name, country, region }: CreatePlayerArgs) {
    const payload = { name, country, region };
    return this.playersService.createOne(payload);
  }
}
