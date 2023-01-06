import { gql } from "urql";
import { Tournament } from "../../../graphql/schema";

export interface DeleteResult {
  id: number;
}

export interface TournamentsDeleteResult {
  deleteTournament: DeleteResult;
}

export const DELETE_TOURNAMENT_MUTATION = gql`
  mutation deleteTournament($id: Int!) {
    deleteTournament(id: $id) {
      id
    }
  }
`;

export interface TournamentsUpdateResult {
  updateTournament: Tournament;
}

export interface TournamentUpdateVariables {
  id: number;
  name?: string | null;
  setId?: number | null;
  region?: string[] | null;
  host?: string | null;
  participantsNumber?: number | null;
  prizePool?: number | null;
  currency?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const UPDATE_TOURNAMENT_MUTATION = gql`
  mutation updateTournament(
    $id: Float!
    $name: String
    $setId: Int
    $region: [String!]
    $host: String
    $participantsNumber: Int
    $prizePool: Float
    $currency: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    updateTournament(
      id: $id
      name: $name
      setId: $setId
      region: $region
      host: $host
      participantsNumber: $participantsNumber
      prizePool: $prizePool
      currency: $currency
      startDate: $startDate
      endDate: $endDate
    ) {
      id
    }
  }
`;
