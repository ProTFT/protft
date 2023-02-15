import { gql } from "urql";
import {
  Lobby,
  LobbyGroup,
  LobbyPlayerInfo,
} from "../../../../../../graphql/schema";

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

export const CREATE_LOBBY_PLAYERS_MUTATION = gql`
  mutation createLobbyPlayers($lobbies: [CreatePlayerLobbyArgs!]!) {
    createLobbyPlayers(lobbies: $lobbies) {
      id
    }
  }
`;

export interface CreateLobbyGroupResult {
  createLobbyGroup: LobbyGroup;
}

export type CreateLobbyGroupVariables = {
  stageId: number;
  sequence: number;
  roundsPlayed: number;
};

export const CREATE_LOBBY_GROUP_MUTATION = gql`
  mutation createLobbyGroup(
    $stageId: Int!
    $sequence: Int!
    $roundsPlayed: Int!
  ) {
    createLobbyGroup(
      stageId: $stageId
      sequence: $sequence
      roundsPlayed: $roundsPlayed
    ) {
      id
    }
  }
`;

export interface CreateLobbyResult {
  createLobby: Lobby;
}

export type CreateLobbyVariables = {
  stageId: number;
  sequence: number;
  lobbyGroupId: number;
  name?: string;
};

export const CREATE_LOBBY_MUTATION = gql`
  mutation createLobby(
    $stageId: Int!
    $sequence: Int!
    $lobbyGroupId: Int!
    $name: String
  ) {
    createLobby(
      stageId: $stageId
      sequence: $sequence
      lobbyGroupId: $lobbyGroupId
      name: $name
    ) {
      id
    }
  }
`;
