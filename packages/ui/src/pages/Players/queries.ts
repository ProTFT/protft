import { gql } from "urql";
import { Player } from "../../graphql/schema";

export interface PlayersQueryResult {
  players: Player[];
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
      playerStats {
        totalGames
        averagePosition
        topFourCount
      }
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
