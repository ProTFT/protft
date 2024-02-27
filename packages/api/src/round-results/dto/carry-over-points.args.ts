import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CarryOverPointsArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;
}
