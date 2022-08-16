import { gql } from "urql";
import { Tournament } from "../../graphql/schema";

export interface TournamentQueryResponse {
  tournament: Tournament;
}

export const TOURNAMENT_QUERY = gql`
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      name
      region
      host
      participantsNumber
      prizePool
      startDate
      endDate
      set {
        id
        name
      }
      stages {
        id
        name
        sequence
        isFinal
      }
    }
  }
`;
