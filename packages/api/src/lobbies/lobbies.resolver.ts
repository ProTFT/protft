import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { fromRawToConsolidatedRoundResults } from "./lobbies.adapter";
import { LobbiesService } from "./lobbies.service";
import { Lobby, PlayerLobbyResult } from "./lobby.entity";

@Resolver(() => Lobby)
export class LobbiesResolver {
  constructor(private lobbiesService: LobbiesService) {}

  @ResolveField()
  async roundCount(@Parent() { id }: Lobby) {
    return this.lobbiesService.findRoundCount(id);
  }

  @ResolveField()
  async playersResults(@Parent() lobby: Lobby): Promise<PlayerLobbyResult[]> {
    const rawResults = await this.lobbiesService.findLobbyResults(lobby.id);
    return fromRawToConsolidatedRoundResults(rawResults);
  }
}
