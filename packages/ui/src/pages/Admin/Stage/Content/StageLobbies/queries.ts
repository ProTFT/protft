import { gql } from "urql";
import { Player, Stage, Tournament } from "../../../../../graphql/schema";

export interface TournamentPlayersResponse {
  tournament: Tournament;
}

export const TOURNAMENT_PLAYERS_QUERY = gql`
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      players {
        id
        name
        region
      }
    }
  }
`;

export interface StagePlayersResponse {
  stage: Stage;
}

export const STAGE_PLAYERS_QUERY = gql`
  query stage($id: Int!) {
    stage(id: $id) {
      id
      players {
        player {
          id
          name
          region
        }
      }
    }
  }
`;

export interface LobbyGroupsQueryResult {
  stage: Pick<Stage, "id" | "lobbyGroups">;
}

export type LobbyGroupsQueryVariables = {
  id: number;
};

export const LOBBY_GROUPS_QUERY = gql`
  query stage($id: Int!) {
    stage(id: $id) {
      id
      lobbyGroups {
        id
        sequence
      }
    }
  }
`;

export interface GenerateLobbiesResult {
  createdLobbyGroups: number;
  createdLobbies: number;
}

export type GenerateLobbiesVariables = {
  stageId: number;
  roundsPerLobbyGroup: number;
};

export const GENERATE_LOBBIES_MUTATION = gql`
  mutation generateLobbies($stageId: Int!, $roundsPerLobbyGroup: Int!) {
    generateLobbies(
      stageId: $stageId
      roundsPerLobbyGroup: $roundsPerLobbyGroup
    ) {
      createdLobbyGroups
      createdLobbies
    }
  }
`;

export interface CreateLobbyGroupsResult {
  id: number;
}

export type CreateLobbyGroupsVariables = {
  stageId: number;
  lobbyGroupsCount: number;
};

export const CREATE_LOBBY_GROUPS_MUTATION = gql`
  mutation createLobbyGroups($stageId: Int!, $lobbyGroupsCount: Int!) {
    createLobbyGroups(stageId: $stageId, lobbyGroupsCount: $lobbyGroupsCount) {
      id
    }
  }
`;

export interface LobbyPlayersQueryResult {
  lobbies: {
    id: number;
    name: string;
    players: Player[];
  }[];
}

export type LobbyPlayersQueryVariables = {
  lobbyGroupId: number;
};

export const LOBBY_PLAYERS_QUERY = gql`
  query lobby($lobbyGroupId: Int!) {
    lobbies(lobbyGroupId: $lobbyGroupId) {
      id
      name
      players {
        id
        name
        region
        country
      }
    }
  }
`;
