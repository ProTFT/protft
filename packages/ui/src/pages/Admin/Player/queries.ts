import { gql } from "urql";

export const PLAYER_QUERY = gql`
  query adminPlayer($id: Int!) {
    player(id: $id) {
      id
      name
      country
      region
      slug
      alias
    }
  }
`;
