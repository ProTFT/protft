import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateStagePlayerArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;

  @Field(() => [Int], { name: "playerIds" })
  playerIds: number[];
}
