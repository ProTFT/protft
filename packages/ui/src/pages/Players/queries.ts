import { gql } from "urql";
import { Player } from "../../graphql/schema";

export interface PlayersQueryResult {
  players: Pick<Player, "id" | "name" | "country" | "region" | "slug">[];
}

export interface PlayersQueryVariables {
  region?: string;
  country?: string;
  searchQuery?: string;
}

export const PLAYERS_QUERY = gql`
  query players($region: String, $country: String, $searchQuery: String) {
    players(region: $region, country: $country, searchQuery: $searchQuery) {
      id
      name
      country
      region
      slug
    }
  }
`;
