import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GetTournamentWithStatsArgs {
  @Field({ name: "searchQuery", nullable: true })
  searchQuery?: string;

  @Field(() => [Int], { name: "setIds", nullable: true })
  setIds?: number[];
}
