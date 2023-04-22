import { gql } from "urql";
import { Player, TournamentsPlayed } from "../../graphql/schema";

export interface PlayerTournamentQueryResult {
  tournamentsPlayed: TournamentsPlayed[];
}

export const PLAYER_TOURNAMENT_QUERY = gql`
  query tournamentsPlayed($playerId: Int!) {
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
`;

export interface PlayerBySlugQueryResult {
  playerBySlug: Pick<
    Player,
    "id" | "name" | "region" | "country" | "playerStats" | "alias"
  >;
}

export const PLAYER_BY_SLUG_QUERY = gql`
  query player($slug: String!) {
    playerBySlug(slug: $slug) {
      id
      name
      region
      country
      alias
      playerStats {
        averagePosition
        totalGames
        topFourCount
        topOneCount
      }
    }
  }
`;
