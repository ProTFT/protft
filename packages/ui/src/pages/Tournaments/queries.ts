import { gql } from "urql";
import { Tournament } from "../../graphql/schema";

export interface FilteredTournamentArgs {
  searchQuery?: string;
  setId: number[];
  region: string[];
  take?: number;
  skip?: number;
}

export interface UpcomingTournamentsQueryResult {
  upcomingTournaments: Tournament[];
}

export const UPCOMING_TOURNAMENTS_QUERY = gql`
  query tournaments(
    $searchQuery: String
    $setId: [Int!]
    $region: [String!]
    $take: Int
    $skip: Int
  ) {
    upcomingTournaments(
      searchQuery: $searchQuery
      setId: $setId
      region: $region
      take: $take
      skip: $skip
    ) {
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
  query tournaments(
    $searchQuery: String
    $setId: [Int!]
    $region: [String!]
    $take: Int
    $skip: Int
  ) {
    pastTournaments(
      searchQuery: $searchQuery
      setId: $setId
      region: $region
      take: $take
      skip: $skip
    ) {
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
