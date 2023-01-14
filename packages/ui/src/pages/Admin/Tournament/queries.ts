import { gql } from "urql";
import { Player, Tournament } from "../../../graphql/schema";

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
    $id: Int!
    $name: String!
    $setId: Int!
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
      currency
      startDate
      endDate
      setId
      set {
        id
        name
      }
    }
  }
`;

export interface Results {
  player: Player;
  positions: number[];
  points: number[];
}

export interface ResultsQueryResponse {
  resultsByStage: Results[];
}

export const RESULTS_QUERY = gql`
  query ($stageId: Int!) {
    resultsByStage(stageId: $stageId) {
      player {
        id
        name
        region
      }
      positions
      points
    }
  }
`;
