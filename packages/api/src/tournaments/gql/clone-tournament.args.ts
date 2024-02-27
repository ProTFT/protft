import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CloneTournamentArgs {
  @Field(() => Int, { name: "tournamentId" })
  tournamentId: number;

  @Field(() => Int, { name: "setId" })
  setId: number;

  @Field({ name: "name" })
  name: string;
}
