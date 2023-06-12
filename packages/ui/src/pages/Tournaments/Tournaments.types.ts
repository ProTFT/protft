import {
  ListPastTournamentsQuery,
  ListOngoingTournamentsQuery,
  ListUpcomingTournamentsQuery,
  ListTournamentsPlayedByPlayerQuery,
} from "../../gql/graphql";

type TournamentsWithMaybePlayerResult =
  ListPastTournamentsQuery["pastTournaments"] &
    ListOngoingTournamentsQuery["ongoingTournaments"] &
    ListUpcomingTournamentsQuery["upcomingTournaments"] &
    ListTournamentsPlayedByPlayerQuery["tournamentsPlayed"];

export type TournamentWithMaybePlayerResult =
  TournamentsWithMaybePlayerResult[0];
