import { gql } from "urql";
import { Player, Tournament } from "../../graphql/schema";

export interface PlayerTournamentQueryResult {
  tournamentsPlayed: Tournament[];
}

export const PLAYER_TOURNAMENT_QUERY = gql`
  query tournamentsPlayed($playerId: Int!) {
    tournamentsPlayed(playerId: $playerId) {
      id
      name
      region
      slug
      set {
        id
      }
      startDate
      endDate
    }
  }
`;

export interface PlayerQueryResult {
  player: Player;
}

export const PLAYER_QUERY = gql`
  query player($id: Int!) {
    player(id: $id) {
      id
      name
      region
      country
      playerStats {
        averagePosition
        totalGames
        topFourCount
        topOneCount
      }
    }
  }
`;

export interface PlayerBySlugQueryResult {
  playerBySlug: Player;
}

export const PLAYER_BY_SLUG_QUERY = gql`
  query player($slug: String!) {
    playerBySlug(slug: $slug) {
      id
      name
      region
      country
      playerStats {
        averagePosition
        totalGames
        topFourCount
        topOneCount
      }
    }
  }
`;
