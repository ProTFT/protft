import { ArgsType, Field, Int, Float } from "@nestjs/graphql";

@ArgsType()
export class CommonTournamentArgs {
  @Field(() => [String], { name: "region", nullable: true })
  region?: string[];

  @Field({ name: "host", nullable: true })
  host?: string;

  @Field(() => Int, { name: "participantsNumber", nullable: true })
  participantsNumber?: number;

  @Field(() => Float, { name: "prizePool", nullable: true })
  prizePool?: number;

  @Field({ name: "startDate", nullable: true })
  startDate?: Date;

  @Field({ name: "endDate", nullable: true })
  endDate?: Date;
}
