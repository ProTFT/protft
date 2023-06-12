import { graphql } from "../../../../../gql";
import { Player, Tournament } from "../../../../../graphql/schema";

export interface PlayersQueryResult {
  players: Player[];
}

export interface PlayersQueryVariables {
  region?: string;
  country?: string;
  searchQuery?: string;
}

export const PLAYERS_QUERY = graphql(`
  query playersPaginated(
    $region: String
    $country: String
    $searchQuery: String
  ) {
    players(
      region: $region
      country: $country
      searchQuery: $searchQuery
      take: 10
      skip: 0
    ) {
      id
      name
      country
      region
    }
  }
`);

export interface TournamentQueryResponse {
  tournament: Tournament;
}

export const TOURNAMENT_PLAYERS_QUERY = graphql(`
  query oneTournamentWithPlayers($id: Int!) {
    tournament(id: $id) {
      id
      players {
        id
        name
        region
      }
    }
  }
`);

export interface CreateTournamentPlayerResult {
  createTournamentPlayers: { id: Pick<Tournament, "id"> };
}

export type CreateTournamentPlayerVariables = {
  tournamentId: number;
  playerIds: number[];
};

export const CREATE_TOURNAMENT_PLAYER = graphql(`
  mutation createTournamentPlayers($tournamentId: Int!, $playerIds: [Int!]!) {
    createTournamentPlayers(
      tournamentId: $tournamentId
      playerIds: $playerIds
    ) {
      id
    }
  }
`);

export type CreateTournamentPlayerByNameVariables = {
  tournamentId: number;
  playerNames: string;
};

export const CREATE_TOURNAMENT_PLAYER_BY_NAME = graphql(`
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
`);

export interface CreatePlayerResult {
  createPlayer: { id: Pick<Player, "id"> };
}

export type CreatePlayerVariables = Pick<
  Player,
  "name" | "country" | "region" | "alias"
>;

export const CREATE_PLAYER_QUERY = graphql(`
  mutation createPlayer(
    $name: String!
    $country: String!
    $region: String!
    $alias: [String!]
  ) {
    createPlayer(
      name: $name
      country: $country
      region: $region
      alias: $alias
    ) {
      id
    }
  }
`);
