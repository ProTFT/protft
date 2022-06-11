import { gql } from "urql";
import { Player } from "../../graphql/schema";

export interface PlayerQueryResult {
  player: Player;
}

export const PLAYER_QUERY = gql`
  query player($id: Int!) {
    player(id: $id) {
      id
      name
      region
      country
    }
  }
`;
