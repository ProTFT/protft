import { gql } from "urql";
import { Tournament } from "../../graphql/schema";

export interface TournamentsQueryResult {
  tournaments: Tournament[];
}

export const TOURNAMENTS_QUERY = gql`
  query tournaments {
    tournaments {
      id
      name
      participantsNumber
      prizePool
    }
  }
`;
