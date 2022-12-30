import { gql } from "urql";
import { PlayersStats } from "../../graphql/schema";

export interface PlayersQueryWithStatsArgs {
  region?: string;
  setId?: number;
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
