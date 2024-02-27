import { graphql } from "../../../../../gql";
import { Player, Stage } from "../../../../../graphql/schema";

export interface LobbyGroupsQueryResult {
  stage: Pick<Stage, "id" | "lobbyGroups">;
}

export type LobbyGroupsQueryVariables = {
  id: number;
};

export const LOBBY_GROUPS_QUERY = graphql(`
  query oneStageWithLobbyGroupsAndRoundsPlayed($id: Int!) {
    stage(id: $id) {
      id
      lobbyGroups {
        id
        sequence
        roundsPlayed
      }
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
  query listLobbiesWithPlayersByLobbyGroup($lobbyGroupId: Int!) {
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
