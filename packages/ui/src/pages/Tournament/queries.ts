import { gql } from "urql";
import { Player, Tournament } from "../../graphql/schema";

export interface TournamentQueryResponse {
  tournament: Tournament;
}

export interface TournamentBySlugQueryResponse {
  tournamentBySlug: Tournament;
}

export const TOURNAMENT_BY_SLUG_QUERY = gql`
  query tournament($slug: String!) {
    tournamentBySlug(slug: $slug) {
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
      stages {
        id
        name
        sequence
        description
        isFinal
        roundCount
      }
    }
  }
`;

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
      stages {
        id
        name
        sequence
        isFinal
        roundCount
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
        slug
      }
      positions
      points
    }
  }
`;
