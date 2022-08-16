import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreatePlayerLobbyArgs {
  @Field(() => Int, { name: "lobbyId" })
  lobbyId: number;

  @Field(() => [Int], { name: "playerIds" })
  playerIds: number[];
}
