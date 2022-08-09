import {
  Args,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { Player } from "../players/player.entity";
import { fromRawToConsolidatedRoundResults } from "./lobbies.adapter";
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
    const lobbyWithPlayers = await this.lobbiesService.findOne(lobby.id);
    return lobbyWithPlayers.players;
  }

  @Query(() => [Lobby])
  async lobbies(@Args("stageId", { type: () => Int }) id: number) {
    return this.lobbiesService.findAllByStage(id);
  }

  @Mutation(() => Lobby)
  async createLobby(
    @Args({ name: "stageId" }) stageId: number,
    @Args({ name: "name" }) name: string,
    @Args({ name: "sequence" }) sequence: number,
  ) {
    const payload = { stageId, name, sequence };
    return this.lobbiesService.createOne(payload);
  }

  @Mutation(() => Round)
  async createRound(
    @Args({ name: "stageId" }) stageId: number,
    @Args({ name: "sequence" }) sequence: number,
  ) {
    const payload = { sequence, stageId };
    return this.lobbiesService.createOneRound(payload);
  }

  @Mutation(() => Round)
  async createPlayerLobby(
    @Args({ name: "lobbyId" }) lobbyId: number,
    @Args({ name: "playerIds", type: () => [Int] }) playerIds: number[],
  ) {
    const payload = { lobbyId, playerIds };
    return this.lobbiesService.createPlayerLobby(payload);
  }

  @Mutation(() => BooleanResult)
  async createLobbyResult(
    @Args({ name: "lobbyId", type: () => Int }) lobbyId: number,
    @Args({ name: "players", type: () => [PlayerLobbyResultInput] })
    players: PlayerLobbyResultInput[],
  ) {
    const positionInputs = [];
    players.forEach(({ playerId, positions }) => {
      positions.forEach(({ roundId, position }) => {
        positionInputs.push({
          lobbyId,
          playerId,
          position,
          roundId,
        });
      });
    });
    try {
      await this.lobbiesService.createResults(positionInputs);
      return { result: true };
    } catch (error) {
      return { result: false, error: String(error) };
    }
  }
}

@ObjectType()
class BooleanResult {
  @Field()
  result: boolean;

  @Field({ nullable: true })
  error: string;
}

@InputType()
class PlayerLobbyResultInput {
  @Field(() => Int)
  playerId: number;

  @Field(() => [PositionResultInput])
  positions: PositionResultInput[];
}

@InputType()
class PositionResultInput {
  @Field(() => Int)
  roundId: number;
  @Field(() => Int)
  position: number;
}
