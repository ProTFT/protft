import { gql } from "urql";
import { Set, Tournament } from "../../../graphql/schema";

export interface TournamentsQueryResponse {
  tournaments: Tournament[];
}

export const TOURNAMENTS_QUERY = gql`
  query tournaments {
    tournaments {
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
