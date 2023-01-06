import { gql } from "urql";
import { Tournament } from "../../../graphql/schema";

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
      set {
        id
        name
      }
    }
  }
`;
