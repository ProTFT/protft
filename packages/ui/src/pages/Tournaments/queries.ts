import { gql } from "urql";
import { Tournament } from "../../graphql/schema";

export interface TournamentsQueryResult {
  tournaments: Tournament[];
}

export const TOURNAMENTS_QUERY = gql`
  query tournaments($searchQuery: String) {
    tournaments(searchQuery: $searchQuery) {
      id
      name
      participantsNumber
      prizePool
      currency
      region
      startDate
      endDate
      slug
      set {
        id
        name
      }
    }
  }
`;

export interface UpcomingTournamentsQueryResult {
  upcomingTournaments: Tournament[];
}

export const UPCOMING_TOURNAMENTS_QUERY = gql`
  query tournaments($searchQuery: String) {
    upcomingTournaments(searchQuery: $searchQuery) {
      id
      name
      participantsNumber
      prizePool
      currency
      region
      startDate
      endDate
      slug
      set {
        id
        name
      }
    }
  }
`;

export interface OngoingTournamentsQueryResult {
  ongoingTournaments: Tournament[];
}

export const ONGOING_TOURNAMENTS_QUERY = gql`
  query tournaments {
    ongoingTournaments {
      id
      name
      participantsNumber
      prizePool
      currency
      region
      startDate
      endDate
      slug
      set {
        id
        name
      }
    }
  }
`;

export interface PastTournamentsQueryResult {
  pastTournaments: Tournament[];
}

export const PAST_TOURNAMENTS_QUERY = gql`
  query tournaments($searchQuery: String) {
    pastTournaments(searchQuery: $searchQuery) {
      id
      name
      participantsNumber
      prizePool
      currency
      region
      startDate
      endDate
      slug
      set {
        id
        name
      }
    }
  }
`;
