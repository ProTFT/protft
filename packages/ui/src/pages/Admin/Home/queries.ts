import { gql } from "urql";
import { Tournament } from "../../../graphql/schema";

export interface TournamentsQueryResult {
  tournaments: Tournament[];
}

export const TOURNAMENTS_QUERY = gql`
  query tournaments($searchQuery: String) {
    tournaments(searchQuery: $searchQuery) {
      id
      name
      participantsNumber
      prizePool
      currency
      region
      startDate
      endDate
      set {
        id
        name
      }
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
    $participantsNumber: Int
    $prizePool: Float
    $startDate: DateTime
    $endDate: DateTime
    $setId: Int!
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
