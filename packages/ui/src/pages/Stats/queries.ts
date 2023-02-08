import { gql } from "urql";
import { Player, PlayersStats } from "../../graphql/schema";

export interface PlayersQueryWithStatsArgs {
  region?: string;
  setId?: number;
  tournamentId?: number;
  skip?: number;
  take?: number;
}

export interface PlayersQueryWithStatsResult {
  playerStats: PlayersStats[];
}

export const PLAYERS_QUERY_WITH_STATS = gql`
  query playersStats($region: String, $setId: Int, $take: Int, $skip: Int) {
    playerStats(setId: $setId, skip: $skip, take: $take, region: $region) {
      player {
        id
        name
      }
      totalGames
      averagePosition
      topOneCount
      eigthCount
      topFourCount
    }
  }
`;

export interface PlayerQueryResult {
  players: Player[];
}

export enum SortColumn {
  AVERAGE_POSITION = "averagePosition",
  TOP_1 = "topOnePercent",
  TOP_4 = "topFourPercent",
  TOTAL_GAMES = "totalGames",
}

export const SortDirection = {
  ASC: true,
  DESC: false,
};

export interface SortOption {
  column: string;
  asc: boolean;
}

export interface PlayersStatsQueryResult {
  playerStats: PlayersStats[];
}

export interface PlayerStatsQueryVariables {
  setId?: number;
  region?: string;
  take?: number;
  skip?: number;
  tournamentIds?: number[];
  sort?: SortOption;
  searchQuery?: string;
}
// region, country, take, skip, searchQuery
export const PLAYER_STATS_QUERY = gql`
  query stats(
    $setId: Int
    $region: String
    $take: Int
    $skip: Int
    $tournamentIds: [Int!]
    $sort: SortOption
    $searchQuery: String
  ) {
    playerStats(
      setId: $setId
      region: $region
      take: $take
      skip: $skip
      tournamentIds: $tournamentIds
      sort: $sort
      searchQuery: $searchQuery
    ) {
      player {
        id
        name
        country
      }
      averagePosition
      topFourCount
      topOneCount
      eigthCount
      totalGames
    }
  }
`;
