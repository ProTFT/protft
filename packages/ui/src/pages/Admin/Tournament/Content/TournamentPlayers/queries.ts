import { gql } from "urql";
import { Player, Tournament } from "../../../../../graphql/schema";

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
    }
  }
`;

export interface TournamentQueryResponse {
  tournament: Tournament;
}

export const TOURNAMENT_PLAYERS_QUERY = gql`
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      players {
        id
        name
        region
      }
    }
  }
`;

export interface CreateTournamentPlayerResult {
  createTournamentPlayers: { id: Pick<Tournament, "id"> };
}

export type CreateTournamentPlayerVariables = {
  tournamentId: number;
  playerIds: number[];
};

export const CREATE_TOURNAMENT_PLAYER = gql`
  mutation createTournamentPlayers($tournamentId: Int!, $playerIds: [Int!]!) {
    createTournamentPlayers(
      tournamentId: $tournamentId
      playerIds: $playerIds
    ) {
      id
    }
  }
`;

export type CreateTournamentPlayerByNameVariables = {
  tournamentId: number;
  playerNames: string;
};

export const CREATE_TOURNAMENT_PLAYER_BY_NAME = gql`
  mutation createTournamentPlayersByName(
    $tournamentId: Int!
    $playerNames: String!
  ) {
    createTournamentPlayersByName(
      tournamentId: $tournamentId
      playerNames: $playerNames
    ) {
      id
    }
  }
`;

export interface CreatePlayerResult {
  createPlayer: { id: Pick<Player, "id"> };
}

export type CreatePlayerVariables = Pick<Player, "name" | "country" | "region">;

export const CREATE_PLAYER_QUERY = gql`
  mutation ($name: String!, $country: String!, $region: String!) {
    createPlayer(name: $name, country: $country, region: $region) {
      id
    }
  }
`;
