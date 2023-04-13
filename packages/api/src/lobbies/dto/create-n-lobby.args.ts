import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateNLobbyArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;

  @Field(() => Int, { name: "lobbyGroupId" })
  lobbyGroupId: number;

  @Field(() => Int, { name: "quantity" })
  quantity: number;
}
