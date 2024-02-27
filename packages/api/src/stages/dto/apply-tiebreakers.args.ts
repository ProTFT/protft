import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class ApplyTiebreakersArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;
}
