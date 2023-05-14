import { gql } from "urql";
import { Set, Tournament } from "../../../graphql/schema";

export interface TournamentsQueryResponse {
  tournamentsWithStats: Tournament[];
}

export const TOURNAMENTS_WITH_STATS_QUERY = gql`
  query tournaments {
    tournamentsWithStats {
      id
      name
      set {
        id
        name
      }
    }
  }
`;

export const TOURNAMENTS_WITH_STATS_AND_FILTER_QUERY = gql`
  query tournaments($searchQuery: String) {
    tournamentsWithStats(searchQuery: $searchQuery) {
      id
      name
      set {
        id
        name
      }
    }
  }
`;

export interface SetsQueryResponse {
  sets: Set[];
}

export const SETS_QUERY = gql`
  query sets {
    sets {
      id
      name
    }
  }
`;
