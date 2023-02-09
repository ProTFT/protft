import { gql } from "urql";
import { LobbyPlayerInfo } from "../../../../../../graphql/schema";

export interface CreatePlayerLobbyGroupResult {
  createPlayerLobby: LobbyPlayerInfo[];
}

export type CreatePlayerLobbyGroupVariables = {
  lobbies: CreatePlayerLobbyVariables[];
};

type CreatePlayerLobbyVariables = {
  lobbyId: number;
  playerIds: number[];
};

export const CREATE_LOBBY_PLAYERS = gql`
  mutation createLobbyPlayers($lobbies: [CreatePlayerLobbyArgs!]!) {
    createLobbyPlayers(lobbies: $lobbies) {
      id
    }
  }
`;
