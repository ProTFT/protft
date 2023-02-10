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
