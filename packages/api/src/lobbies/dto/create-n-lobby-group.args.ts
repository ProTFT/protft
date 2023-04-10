import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateNLobbyGroupArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;

  @Field(() => Int, { name: "quantity" })
  quantity: number;

  @Field(() => Int, { name: "roundsPlayed" })
  roundsPlayed: number;
}
