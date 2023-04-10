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
import { CreateRoundArgs } from "../rounds/dto/create-round.args";
import { LobbiesService } from "./lobbies.service";
import { Lobby } from "./lobby.entity";
import { Round } from "../rounds/round.entity";
import { RoundsService } from "../rounds/rounds.service";
import { DeleteResponse } from "../lib/dto/delete-return";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";
import { UpdateLobbyArgs } from "./dto/update-lobby.args";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import { CreatePlayerLobbyGroupArgs } from "./dto/create-player-lobby-group.args";
import { LobbyGroup } from "./lobby-group.entity";
import { CreateLobbyGroupArgs } from "./dto/create-lobby-group.args";
import { CreateNLobbyArgs } from "./dto/create-n-lobby.args";
import { CreateNLobbyGroupArgs } from "./dto/create-n-lobby-group.args";

@Resolver(() => Lobby)
export class LobbiesResolver {
  constructor(
    private lobbiesService: LobbiesService,
    private roundsService: RoundsService,
  ) {}

  @ResolveField()
  async players(@Parent() lobby: Lobby): Promise<Player[]> {
    const lobbyWithPlayers = await this.lobbiesService.findOneWithRelations(
      lobby.id,
      ["players", "players.player"],
    );
    return lobbyWithPlayers.players.map((l) => l.player);
  }

  @Query(() => [Lobby])
  async lobbies(@Args("lobbyGroupId", { type: () => Int }) id: number) {
    return this.lobbiesService.findAllByLobbyGroup(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Lobby)
  async createLobby(
    @Args() { stageId, name, sequence, lobbyGroupId }: CreateLobbyArgs,
  ) {
    const payload = { stageId, name, sequence, lobbyGroupId };
    return this.lobbiesService.createOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [Lobby])
  async createNLobby(
    @Args() { stageId, lobbyGroupId, quantity }: CreateNLobbyArgs,
  ) {
    return this.lobbiesService.createN(stageId, lobbyGroupId, quantity);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Lobby)
  async updateLobby(@Args() payload: UpdateLobbyArgs) {
    return this.lobbiesService.updateOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => DeleteResponse)
  async deleteLobby(@Args({ name: "id", type: () => Int }) id: number) {
    return this.lobbiesService.deleteOne(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Round)
  async createRound(@Args() { sequence, stageId }: CreateRoundArgs) {
    const payload = { sequence, stageId };
    return this.roundsService.createOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => LobbyGroup)
  async createLobbyGroup(
    @Args() { stageId, sequence, roundsPlayed }: CreateLobbyGroupArgs,
  ) {
    const payload = { stageId, sequence, roundsPlayed };
    return this.lobbiesService.createOneLobbyGroup(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [LobbyGroup])
  async createNLobbyGroup(
    @Args() { stageId, quantity, roundsPlayed }: CreateNLobbyGroupArgs,
  ) {
    return this.lobbiesService.createNLobbyGroup(
      stageId,
      quantity,
      roundsPlayed,
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [LobbyPlayerInfo])
  async createLobbyPlayers(@Args() payload: CreatePlayerLobbyGroupArgs) {
    return this.lobbiesService.createPlayerLobbyGroup(payload);
  }
}
