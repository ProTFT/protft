import { gql } from "urql";
import { LobbyPlayerInfo } from "../../../../../../graphql/schema";

export interface CreatePlayerLobbyGroupResult {
  createPlayerLobby: LobbyPlayerInfo[];
}

export type CreatePlayerLobbyGroupVariables = {
  lobbyGroupId: number;
  players: CreatePlayerLobbyVariables[];
};

type CreatePlayerLobbyVariables = {
  lobbyId: number;
  playerIds: number[];
};

export const CREATE_PLAYER_LOBBY_GROUP = gql`
  mutation createPlayerLobbyGroup(
    $lobbyGroupId: Int!
    $players: [CreatePlayerLobbyArgs!]!
  ) {
    createPlayerLobbyGroup(lobbyGroupId: $lobbyGroupId, players: $players) {
      id
    }
  }
`;
