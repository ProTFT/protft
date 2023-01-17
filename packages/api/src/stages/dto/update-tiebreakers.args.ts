import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class UpdateTiebreakersArgs {
  @Field(() => Int, { name: "id" })
  id: number;

  @Field(() => [Int], { name: "tiebreakers" })
  tiebreakers: number[];
}
