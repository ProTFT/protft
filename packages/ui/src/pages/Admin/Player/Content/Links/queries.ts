import { gql } from "urql";

export const PLAYER_LINKS_QUERY = gql`
  query adminPlayerLinks($playerId: Int!) {
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

export const CREATE_PLAYER_LINK_MUTATION = gql`
  mutation createPlayerLink($playerId: Int!, $link: String!, $type: String!) {
    createPlayerLink(playerId: $playerId, link: $link, type: $type) {
      id
    }
  }
`;

export const DELETE_PLAYER_LINK_MUTATION = gql`
  mutation deletePlayerLink($id: Int!) {
    deletePlayerLink(id: $id) {
      id
    }
  }
`;
