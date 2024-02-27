import { graphql } from "../../gql";
import { Player, TournamentsPlayed } from "../../graphql/schema";

export interface PlayerTournamentQueryResult {
  tournamentsPlayed: TournamentsPlayed[];
}

export const PLAYER_TOURNAMENT_QUERY = graphql(`
  query listTournamentsPlayedByPlayer($playerId: Int!) {
    tournamentsPlayed(playerId: $playerId) {
      id
      name
      region
      slug
      participantsNumber
      prizePool
      currency
      startDate
      endDate
      set {
        id
        name
      }
      finalPosition
    }
  }
`);

export interface PlayerBySlugQueryResult {
  playerBySlug: Pick<Player, "id" | "name" | "region" | "country" | "alias">;
}

export const PLAYER_BY_SLUG_QUERY = graphql(`
  query onePlayerBySlug($slug: String!) {
    playerBySlug(slug: $slug) {
      id
      name
      region
      country
      alias
    }
  }
`);

export interface PlayerStatsBySlugQueryResult {
  player: Pick<Player, "id" | "playerStats">;
}

export const PLAYER_STATS_QUERY = graphql(`
  query onePlayerWithStats($id: Int!, $setId: Int) {
    player(id: $id) {
      id
      playerStats(setId: $setId) {
        averagePosition
        totalGames
        topFourCount
        topOneCount
      }
    }
  }
`);
