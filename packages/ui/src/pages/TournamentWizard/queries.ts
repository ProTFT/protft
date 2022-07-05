import { gql } from "urql";
import { Player } from "../../graphql/schema";

export interface CreatePlayerResult {
  createUser: { id: Pick<Player, "id"> };
}

export type CreatePlayerVariables = Pick<Player, "name" | "country" | "region">;

export const CREATE_PLAYER_QUERY = gql`
  mutation ($name: String!, $country: String!, $region: String!) {
    createUser(name: $name, country: $country, region: $region) {
      id
    }
  }
`;
