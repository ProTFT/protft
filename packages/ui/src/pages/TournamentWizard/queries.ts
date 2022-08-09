import { gql } from "urql";
import { Player, Tournament } from "../../graphql/schema";

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

export interface CreateTournamentResult {
  createTournament: { id: Pick<Tournament, "id"> };
}

export type CreateTournamentVariables = Pick<
  Tournament,
  "name" | "region" | "setId"
>;

export const CREATE_TOURNAMENT_QUERY = gql`
  mutation createTournament(
    $name: String!
    $region: [String!]
    $host: String
    $participantsNumber: Float
    $prizePool: Float
    $startDate: DateTime
    $endDate: DateTime
    $setId: Float!
  ) {
    createTournament(
      name: $name
      region: $region
      host: $host
      participantsNumber: $participantsNumber
      prizePool: $prizePool
      startDate: $startDate
      endDate: $endDate
      setId: $setId
    ) {
      id
    }
  }
`;
