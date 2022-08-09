import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { Player } from "../players/player.entity";
import { CreateLobbyResultArgs } from "./dto/create-lobby-result.args";
import { CreateLobbyArgs } from "./dto/create-lobby.args";
import { CreatePlayerLobbyArgs } from "./dto/create-player-lobby.args";
import { CreateRoundArgs } from "./dto/create-round.args";
import { BooleanResult } from "./dto/create-lobby-result.out";
import {
  formatResults,
  fromRawToConsolidatedRoundResults,
} from "./lobbies.adapter";
import { LobbiesService } from "./lobbies.service";
import { Lobby, PlayerLobbyResult } from "./lobby.entity";
import { Round } from "./round.entity";

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

  @ResolveField()
  async players(@Parent() lobby: Lobby): Promise<Player[]> {
    const lobbyWithPlayers = await this.lobbiesService.findOneWithPlayers(
      lobby.id,
    );
    return lobbyWithPlayers.players;
  }

  @Query(() => [Lobby])
  async lobbies(@Args("stageId", { type: () => Int }) id: number) {
    return this.lobbiesService.findAllByStage(id);
  }

  @Mutation(() => Lobby)
  async createLobby(@Args() { stageId, name, sequence }: CreateLobbyArgs) {
    const payload = { stageId, name, sequence };
    return this.lobbiesService.createOne(payload);
  }

  @Mutation(() => Round)
  async createRound(@Args() { sequence, stageId }: CreateRoundArgs) {
    const payload = { sequence, stageId };
    return this.lobbiesService.createOneRound(payload);
  }

  @Mutation(() => Round)
  async createPlayerLobby(
    @Args() { lobbyId, playerIds }: CreatePlayerLobbyArgs,
  ) {
    const payload = { lobbyId, playerIds };
    return this.lobbiesService.createPlayerLobby(payload);
  }

  @Mutation(() => BooleanResult)
  async createLobbyResult(@Args() args: CreateLobbyResultArgs) {
    const positionInputs = formatResults(args);
    try {
      await this.lobbiesService.createResults(positionInputs);
      return { result: true };
    } catch (error) {
      return { result: false, error: String(error) };
    }
  }
}
