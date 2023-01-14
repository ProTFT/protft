import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";

@ArgsType()
export class CreatePlayerLobbyGroupArgs {
  @Field(() => Int, { name: "lobbyGroupId" })
  lobbyGroupId: number;

  @Field(() => [CreatePlayerLobbyArgs], { name: "players" })
  players: CreatePlayerLobbyArgs[];
}

@InputType()
class CreatePlayerLobbyArgs {
  @Field(() => Int, { name: "lobbyId" })
  lobbyId: number;

  @Field(() => [Int], { name: "playerIds" })
  playerIds: number[];
}
