import { gql } from "urql";
import { Lobby } from "../../graphql/schema";

export interface CreatePlayerLobbyResult {
  createPlayerLobby: { id: Pick<Lobby, "id"> };
}

export type CreatePlayerLobbyVariables = {
  lobbyId: number;
  playerIds: number[];
};

export const CREATE_PLAYER_LOBBY = gql`
  mutation createPlayerLobby($lobbyId: Float!, $playerIds: [Int!]!) {
    createPlayerLobby(lobbyId: $lobbyId, playerIds: $playerIds) {
      id
    }
  }
`;
