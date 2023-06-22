import { gql } from "urql";

export const PLAYER_LINKS_QUERY = gql`
  query playerLinks($playerId: Int!) {
    player(id: $playerId) {
      id
      links {
        id
        type
        link
      }
    }
  }
`;
