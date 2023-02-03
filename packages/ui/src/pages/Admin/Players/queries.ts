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
