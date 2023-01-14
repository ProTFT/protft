import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateLobbyArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;

  @Field({ name: "name" })
  name: string;

  @Field(() => Int, { name: "sequence" })
  sequence: number;

  @Field(() => Int, { name: "lobbyGroupId" })
  lobbyGroupId: number;
}
