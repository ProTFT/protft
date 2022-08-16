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
import { CreateLobbyArgs } from "./dto/create-lobby.args";
import { CreatePlayerLobbyArgs } from "./dto/create-player-lobby.args";
import { CreateRoundArgs } from "../rounds/dto/create-round.args";
import { LobbiesService } from "./lobbies.service";
import { Lobby } from "./lobby.entity";
import { Round } from "../rounds/round.entity";
import { RoundsService } from "../rounds/rounds.service";

@Resolver(() => Lobby)
export class LobbiesResolver {
  constructor(
    private lobbiesService: LobbiesService,
    private roundsService: RoundsService,
  ) {}

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
    return this.roundsService.createOne(payload);
  }

  @Mutation(() => Round)
  async createPlayerLobby(
    @Args() { lobbyId, playerIds }: CreatePlayerLobbyArgs,
  ) {
    const payload = { lobbyId, playerIds };
    return this.lobbiesService.createPlayerLobby(payload);
  }
}
