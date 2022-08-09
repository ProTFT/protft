import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateRoundArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;

  @Field(() => Int, { name: "sequence" })
  sequence: number;
}
