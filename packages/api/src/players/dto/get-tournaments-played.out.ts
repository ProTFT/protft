import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Tournament } from "../../tournaments/tournament.entity";

@ObjectType()
export class TournamentsPlayed extends Tournament {
  @Field(() => Int, { nullable: true })
  finalPosition?: number;
}
