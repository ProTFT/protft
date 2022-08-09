import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateLobbyResultArgs {
  @Field(() => Int, { name: "lobbyId" })
  lobbyId: number;

  @Field(() => [PlayerLobbyResultInput], { name: "players" })
  players: PlayerLobbyResultInput[];
}

@InputType()
class PlayerLobbyResultInput {
  @Field(() => Int, { name: "playerId" })
  playerId: number;

  @Field(() => [PositionResultInput], { name: "positions" })
  positions: PositionResultInput[];
}

@InputType()
class PositionResultInput {
  @Field(() => Int, { name: "roundId" })
  roundId: number;

  @Field(() => Int, { name: "position" })
  position: number;
}
