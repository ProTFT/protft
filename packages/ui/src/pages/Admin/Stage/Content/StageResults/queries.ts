import { gql } from "urql";
import { Player, Stage } from "../../../../../graphql/schema";

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
        roundsPlayed
      }
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
