import { Field, ObjectType } from "@nestjs/graphql";
import { Tournament } from "../tournament.entity";

@ObjectType()
export class TournamentOverview {
  @Field(() => [Tournament])
  pastTournaments: Tournament[];

  @Field(() => [Tournament])
  liveTournaments: Tournament[];

  @Field(() => [Tournament])
  upcomingTournaments: Tournament[];
}
