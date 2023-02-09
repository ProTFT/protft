import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";

@ArgsType()
export class CreatePlayerLobbyGroupArgs {
  @Field(() => [CreatePlayerLobbyArgs])
  lobbies: CreatePlayerLobbyArgs[];
}

@InputType()
class CreatePlayerLobbyArgs {
  @Field(() => Int, { name: "lobbyId" })
  lobbyId: number;

  @Field(() => [Int], { name: "playerIds" })
  playerIds: number[];
}
