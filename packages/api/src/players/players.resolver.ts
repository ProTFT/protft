import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { BaseResolver } from "../lib/BaseResolver";
import { Player, PlayerFilterMeta } from "./player.entity";
import { PlayersService } from "./players.service";

@Resolver(() => Player)
export class PlayersResolver extends BaseResolver {
  constructor(private playersService: PlayersService) {
    super();
  }

  @Query(() => [Player])
  async players(
    @Args("region", { nullable: true }) region: string,
    @Args("country", { nullable: true }) country: string,
  ) {
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
}
