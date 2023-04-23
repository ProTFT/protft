import { gql } from "urql";
import { Player } from "../../../graphql/schema";

export interface PlayersQueryResult {
  adminPlayers: Player[];
}

export const PLAYERS_ADMIN_QUERY = gql`
  query players($searchQuery: String) {
    adminPlayers(searchQuery: $searchQuery, take: 20) {
      id
      name
      region
      country
      alias
    }
  }
`;

export interface DeletePlayerResult {
  deletePlayer: { id: Pick<Player, "id"> };
}

export type DeletePlayerVariables = Pick<Player, "id">;

export const DELETE_PLAYER_MUTATION = gql`
  mutation deletePlayer($id: Int!) {
    deletePlayer(id: $id) {
      id
    }
  }
`;

export interface UpdatePlayerResult {
  deletePlayer: { id: Pick<Player, "id"> };
}

export type UpdatePlayerVariables = Pick<Player, "id">;

export const UPDATE_PLAYER_MUTATION = gql`
  mutation updatePlayer(
    $id: Int!
    $name: String
    $country: String
    $region: String
    $slug: String
    $alias: [String!]
  ) {
    updatePlayer(
      id: $id
      name: $name
      country: $country
      region: $region
      slug: $slug
      alias: $alias
    ) {
      id
    }
  }
`;

export interface MergePlayerResult {
  mergePlayer: { id: Pick<Player, "id"> };
}

export interface MergePlayerVariables {
  playerIdToMaintain: number;
  playerIdToRemove: number;
}

export const MERGE_PLAYER_MUTATION = gql`
  mutation mergePlayer($playerIdToMaintain: Int!, $playerIdToRemove: Int!) {
    mergePlayer(
      playerIdToMaintain: $playerIdToMaintain
      playerIdToRemove: $playerIdToRemove
    ) {
      id
    }
  }
`;
