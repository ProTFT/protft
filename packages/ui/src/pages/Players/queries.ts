import { gql } from "urql";
import { Player } from "../../graphql/schema";

export interface PlayersQueryResult {
  players: Player[];
}

export interface PlayersQueryVariables {
  region?: string;
  country?: string;
}

export const PLAYERS_QUERY = gql`
  query players($region: String, $country: String) {
    players(region: $region, country: $country) {
      id
      name
      country
      region
    }
  }
`;

export interface PlayerFilterQueryResult {
  playerFilterMeta: PlayerFilterData;
}

interface PlayerFilterData {
  possibleRegions: string[];
  possibleCountries: string[];
}

export const PLAYER_FILTERS_QUERY = gql`
  query playerFilterMeta {
    playerFilterMeta {
      possibleRegions
      possibleCountries
    }
  }
`;
