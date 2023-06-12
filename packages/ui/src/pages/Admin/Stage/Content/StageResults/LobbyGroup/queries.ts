import { graphql } from "../../../../../../gql";
import {
  CreateLobbyGroupResults,
  Player,
} from "../../../../../../graphql/schema";

export interface ResultsByLobbyGroupQueryVariables {
  lobbyGroupId: number;
}

export interface ResultsByLobbyGroupQueryResult {
  resultsByLobbyGroup: {
    player: Player;
    positions: number[];
    lobbyPlayerId: number;
  }[];
}

export const RESULTS_BY_LOBBY_GROUP_QUERY = graphql(`
  query results($lobbyGroupId: Int!) {
    resultsByLobbyGroup(lobbyGroupId: $lobbyGroupId) {
      player {
        id
        name
      }
      positions
      lobbyPlayerId
    }
  }
`);

export interface CreateResultsByLobbyGroupMutationVariables {
  lobbyGroupId: number;
  results: CreateLobbyGroupResults[];
}

export const CREATE_RESULTS_BY_LOBBY_GROUP_MUTATION = graphql(`
  mutation createResults(
    $lobbyGroupId: Int!
    $results: [CreateLobbyGroupResults!]!
  ) {
    createLobbyGroupResult(lobbyGroupId: $lobbyGroupId, results: $results) {
      roundId
    }
  }
`);
