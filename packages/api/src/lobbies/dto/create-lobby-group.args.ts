import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateLobbyGroupArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;

  @Field(() => Int, { name: "sequence" })
  sequence: number;

  @Field(() => Int, { name: "roundsPlayed" })
  roundsPlayed: number;
}
