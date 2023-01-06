import { ArgsType, Field, Float, Int } from "@nestjs/graphql";

@ArgsType()
export class UpdateTournamentArgs {
  @Field({ name: "id" })
  id: number;

  @Field({ name: "name", nullable: true })
  name?: string;

  @Field(() => Int, { name: "setId", nullable: true })
  setId?: number;

  @Field(() => [String], { name: "region", nullable: true })
  region?: string[];

  @Field({ name: "host", nullable: true })
  host?: string;

  @Field(() => Int, { name: "participantsNumber", nullable: true })
  participantsNumber?: number;

  @Field(() => Float, { name: "prizePool", nullable: true })
  prizePool?: number;

  @Field({ name: "currency", nullable: true })
  currency?: string;

  @Field({ name: "startDate", nullable: true })
  startDate?: Date;

  @Field({ name: "endDate", nullable: true })
  endDate?: Date;
}
