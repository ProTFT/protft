import { gql } from "urql";
import { Player, PlayerCalculatedStats } from "../../graphql/schema";

export interface PlayerQueryResult {
  players: Player[];
}

export enum SortColumn {
  AVERAGE_POSITION = "averagePosition",
  TOP_1 = "topOnePercent",
  TOP_4 = "topFourPercent",
  TOTAL_GAMES = "totalGames",
}

export enum Filters {
  REGION,
  TOURNAMENTS,
  SET,
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
  playerStats: ({ player: Player } & PlayerCalculatedStats)[];
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
        slug
      }
      averagePosition
      topFourCount
      topOneCount
      eigthCount
      totalGames
    }
  }
`;
