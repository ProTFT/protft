import { graphql } from "../../../gql";
import { Tournament } from "../../../graphql/schema";

export interface TournamentsQueryResult {
  adminTournaments: Tournament[];
}

export const TOURNAMENTS_QUERY = graphql(`
  query listAdminTournamentsPaginated(
    $searchQuery: String
    $skip: Int
    $take: Int
  ) {
    adminTournaments(searchQuery: $searchQuery, skip: $skip, take: $take) {
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
`);

export interface CreateTournamentResult {
  createTournament: { id: Pick<Tournament, "id"> };
}

export type CreateTournamentVariables = Pick<
  Tournament,
  | "name"
  | "region"
  | "host"
  | "participantsNumber"
  | "prizePool"
  | "startDate"
  | "endDate"
  | "setId"
  | "currency"
>;

export const CREATE_TOURNAMENT_QUERY = graphql(`
  mutation createTournament(
    $name: String!
    $region: [String!]!
    $host: String
    $participantsNumber: Int
    $prizePool: Float
    $startDate: DateTime
    $endDate: DateTime
    $setId: Int!
    $currency: String
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
      currency: $currency
    ) {
      id
    }
  }
`);

export const CREATE_PLAYER_SLUGS_MUTATION = graphql(`
  mutation createPlayerSlugs {
    createPlayerSlugs {
      id
      name
      slug
    }
  }
`);

export const CREATE_TOURNAMENT_SLUGS_MUTATION = graphql(`
  mutation createTournamentSlugs {
    createTournamentSlugs {
      id
      name
      slug
    }
  }
`);
