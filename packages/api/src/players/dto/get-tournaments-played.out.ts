import { Field, ObjectType } from "@nestjs/graphql";
import { Tournament } from "../../tournaments/entities/tournament.entity";

@ObjectType()
export class TournamentsPlayed extends Tournament {
  @Field({ nullable: true })
  finalPosition?: string;
}
