import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class GetTournamentWithStatsArgs {
  @Field({ name: "searchQuery", nullable: true })
  searchQuery?: string;
}
