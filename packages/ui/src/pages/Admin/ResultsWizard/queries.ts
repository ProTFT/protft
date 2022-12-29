import { gql } from "urql";
import { PlayerLobbyResultInput } from "../../../graphql/schema";

export interface CreateResultVariables {
  lobbyId: number;
  players: PlayerLobbyResultInput[];
}

export const CREATE_RESULT_QUERY = gql`
  mutation createLobbyResult(
    $lobbyId: Int!
    $players: [PlayerLobbyResultInput!]!
  ) {
    createLobbyResult(lobbyId: $lobbyId, players: $players) {
      result
      error
    }
  }
`;
