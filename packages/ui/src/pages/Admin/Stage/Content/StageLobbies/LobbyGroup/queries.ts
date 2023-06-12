import { graphql } from "../../../../../../gql";
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

export const CREATE_LOBBY_PLAYERS_MUTATION = graphql(`
  mutation createLobbyPlayers($lobbies: [CreatePlayerLobbyArgs!]!) {
    createLobbyPlayers(lobbies: $lobbies) {
      id
    }
  }
`);

export interface CreateLobbyGroupResult {
  createLobbyGroup: LobbyGroup;
}

export type CreateLobbyGroupVariables = {
  stageId: number;
  sequence: number;
  roundsPlayed: number;
};

export const CREATE_LOBBY_GROUP_MUTATION = graphql(`
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
`);

export interface CreateNLobbyGroupResult {
  createNLobbyGroup: LobbyGroup[];
}

export type CreateNLobbyGroupVariables = {
  stageId: number;
  quantity: number;
  roundsPlayed: number;
};

export const CREATE_N_LOBBY_GROUP_MUTATION = graphql(`
  mutation createNLobbyGroup(
    $stageId: Int!
    $quantity: Int!
    $roundsPlayed: Int!
  ) {
    createNLobbyGroup(
      stageId: $stageId
      quantity: $quantity
      roundsPlayed: $roundsPlayed
    ) {
      id
    }
  }
`);

export interface CreateNLobbyResult {
  createNLobby: Lobby[];
}

export type CreateNLobbyVariables = {
  stageId: number;
  lobbyGroupId: number;
  quantity: number;
};

export const CREATE_N_LOBBY_MUTATION = graphql(`
  mutation createNLobby($stageId: Int!, $quantity: Int!, $lobbyGroupId: Int!) {
    createNLobby(
      stageId: $stageId
      quantity: $quantity
      lobbyGroupId: $lobbyGroupId
    ) {
      id
    }
  }
`);

export interface CreateLobbyResult {
  createLobby: Lobby;
}

export type CreateLobbyVariables = {
  stageId: number;
  sequence: number;
  lobbyGroupId: number;
  name?: string;
};

export const CREATE_LOBBY_MUTATION = graphql(`
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
`);

export interface DeleteLobbyGroupsResult {
  deleteLobbyGroups: {
    id: number;
  };
}

export type DeleteLobbyGroupsVariables = {
  stageId: number;
};

export const DELETE_LOBBY_GROUPS = graphql(`
  mutation deleteLobbyGroups($stageId: Int!) {
    deleteLobbyGroups(stageId: $stageId) {
      id
    }
  }
`);
