import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateTournamentPlayerArgs {
  @Field(() => Int, { name: "tournamentId" })
  tournamentId: number;

  @Field(() => [Int], { name: "playerIds" })
  playerIds: number[];
}
