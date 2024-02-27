import { graphql } from "../../gql";
import { PaginationArgs } from "../../graphql/pagination";
import { Player } from "../../graphql/schema";

export interface PlayersQueryResult {
  players: Pick<
    Player,
    "id" | "name" | "country" | "region" | "slug" | "alias"
  >[];
}

export interface PlayersQueryVariables extends PaginationArgs {
  region?: string;
  country?: string;
  searchQuery?: string;
}

export const PLAYERS_QUERY = graphql(`
  query players(
    $region: String
    $country: String
    $searchQuery: String
    $take: Int
    $skip: Int
  ) {
    players(
      region: $region
      country: $country
      searchQuery: $searchQuery
      take: $take
      skip: $skip
    ) {
      id
      name
      country
      region
      slug
      alias
    }
  }
`);
