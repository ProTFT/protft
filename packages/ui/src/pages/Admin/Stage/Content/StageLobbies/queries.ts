import { graphql } from "../../../../../gql";
import { Player, Stage, Tournament } from "../../../../../graphql/schema";

export interface TournamentPlayersResponse {
  tournament: Tournament;
}

export const TOURNAMENT_PLAYERS_QUERY = graphql(`
  query oneTournamentWithPlayers($id: Int!) {
    tournament(id: $id) {
      id
      players {
        id
        name
        region
      }
    }
  }
`);

export interface StagePlayersResponse {
  stage: Stage;
}

export const STAGE_PLAYERS_QUERY = graphql(`
  query oneStageWithPlayers($id: Int!) {
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
`);

export interface LobbyGroupsQueryResult {
  stage: Pick<Stage, "id" | "lobbyGroups">;
}

export type LobbyGroupsQueryVariables = {
  id: number;
};

export const LOBBY_GROUPS_QUERY = graphql(`
  query oneStageWithLobbyGroups($id: Int!) {
    stage(id: $id) {
      id
      lobbyGroups {
        id
        sequence
      }
    }
  }
`);

export interface GenerateLobbiesResult {
  createdLobbyGroups: number;
  createdLobbies: number;
}

export type GenerateLobbiesVariables = {
  stageId: number;
  roundsPerLobbyGroup: number;
};

export const GENERATE_LOBBIES_MUTATION = graphql(`
  mutation generateLobbies($stageId: Int!, $roundsPerLobbyGroup: Int!) {
    generateLobbies(
      stageId: $stageId
      roundsPerLobbyGroup: $roundsPerLobbyGroup
    ) {
      createdLobbyGroups
      createdLobbies
    }
  }
`);

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

export const LOBBY_PLAYERS_QUERY = graphql(`
  query listLobbiesWithPlayers($lobbyGroupId: Int!) {
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
`);
