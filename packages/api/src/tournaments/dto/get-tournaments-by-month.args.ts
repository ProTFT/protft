import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GetTournamentsByMonthArgs {
  @Field(() => Int, { name: "month" })
  month: number;

  @Field(() => Int, { name: "year" })
  year: number;

  @Field(() => [String], { name: "region", nullable: true })
  region?: string[];
}
