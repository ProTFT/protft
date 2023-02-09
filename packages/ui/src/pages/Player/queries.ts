import { gql } from "urql";
import { Player, Tournament } from "../../graphql/schema";

export interface PlayerTournamentQueryResult {
  tournamentsPlayed: Pick<
    Tournament,
    | "id"
    | "name"
    | "region"
    | "slug"
    | "set"
    | "startDate"
    | "endDate"
    | "participantsNumber"
    | "prizePool"
    | "currency"
  >[];
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
      set {
        id
        name
      }
      startDate
      endDate
    }
  }
`;

export interface PlayerBySlugQueryResult {
  playerBySlug: Pick<
    Player,
    "id" | "name" | "region" | "country" | "playerStats"
  >;
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
