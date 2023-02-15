import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GetStagePlayerArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;

  @Field(() => Int, { name: "playerId" })
  playerId: number;
}
