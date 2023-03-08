import { gql } from "urql";
import {
  LobbyGroupWithLobbies,
  Player,
  PlayerResults,
  Tournament,
} from "../../graphql/schema";

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
        stageType
        qualifiedCount
      }
    }
  }
`;

export interface ResultsByLobbyGroup {
  player: Player;
  positions: number[];
  points: number[];
}

export interface ResultsByLobbyGroupQueryResponse {
  resultsByStage: PlayerResults[];
}

export const RESULTS_BY_STAGE_QUERY = gql`
  query ($stageId: Int!) {
    resultsByStage(stageId: $stageId) {
      player {
        id
        name
        country
        slug
      }
      positions
      points
    }
  }
`;

export interface ResultsByLobbyGroup {
  player: Player;
  positions: number[];
  points: number[];
}

export interface ResultsByLobbyQueryResponse {
  lobbyResultsByStage: LobbyGroupWithLobbies[];
}

export const RESULTS_BY_LOBBY = gql`
  query ($stageId: Int!) {
    lobbyResultsByStage(stageId: $stageId) {
      id
      roundsPlayed
      lobbies {
        id
        name
        results {
          player {
            id
            name
            country
            slug
          }
          positions
          points
        }
      }
    }
  }
`;
