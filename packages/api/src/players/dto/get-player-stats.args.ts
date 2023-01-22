import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GetPlayerStatsArgs {
  @Field(() => Int, { name: "setId", nullable: true })
  setId?: number;

  @Field(() => Int, { name: "tournamentId", nullable: true })
  tournamentId?: number;
}
