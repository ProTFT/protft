import { graphql } from "../../../gql";
import { Player, Tournament } from "../../../graphql/schema";

export interface DeleteResult {
  id: number;
}

export interface TournamentsDeleteResult {
  deleteTournament: DeleteResult;
}

export const DELETE_TOURNAMENT_MUTATION = graphql(`
  mutation deleteTournament($id: Int!) {
    deleteTournament(id: $id) {
      id
    }
  }
`);

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
  visibility?: boolean | null;
}

export const UPDATE_TOURNAMENT_MUTATION = graphql(`
  mutation updateTournament(
    $id: Int!
    $name: String
    $setId: Int
    $region: [String!]
    $host: String
    $participantsNumber: Int
    $prizePool: Float
    $currency: String
    $startDate: DateTime
    $endDate: DateTime
    $visibility: Boolean
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
      visibility: $visibility
    ) {
      id
    }
  }
`);

export interface LockResultsResult {
  lockTournament: {
    tournamentId: number;
  };
}

export interface LockResultsVariables {
  id: number;
}

export const LOCK_RESULTS_MUTATION = graphql(`
  mutation lockTournament($id: Int!) {
    lockTournament(id: $id) {
      tournamentId
    }
  }
`);

export interface DeleteResultsResult {
  deleteTournamentResults: {
    id: number;
  };
}

export interface DeleteResultsVariables {
  id: number;
}

export const DELETE_RESULTS_MUTATION = graphql(`
  mutation deleteTournamentResults($id: Int!) {
    deleteTournamentResults(id: $id) {
      id
    }
  }
`);

export interface TournamentQueryResponse {
  tournament: Tournament;
}

export const TOURNAMENT_QUERY = graphql(`
  query oneTournamentFull($id: Int!) {
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
      visibility
      set {
        id
        name
      }
    }
  }
`);

export interface Results {
  player: Player;
  positions: number[];
  points: number[];
}
