import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class UpdateStagePlayerArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;

  @Field(() => Int, { name: "playerId" })
  playerId: number;

  @Field(() => Int, { name: "extraPoints", nullable: true })
  extraPoints?: number;

  @Field(() => Int, { name: "tiebreakerRanking", nullable: true })
  tiebreakerRanking?: number;
}
