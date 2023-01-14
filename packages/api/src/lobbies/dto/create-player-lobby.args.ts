import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreatePlayerLobbyArgs {
  @Field(() => Int, { name: "lobbyId" })
  lobbyId: number;

  @Field(() => [Int], { name: "playerIds" })
  playerIds: number[];
}
