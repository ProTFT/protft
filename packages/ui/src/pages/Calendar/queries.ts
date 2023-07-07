import { graphql } from "../../gql";

export const TOURNAMENT_BY_DATE = graphql(`
  query tournamentsByDate(
    $startDate: String!
    $endDate: String!
    $region: [String!]
  ) {
    tournaments(
      startDate: $startDate
      endDate: $endDate
      region: $region
      skip: 0
      take: 1000
    ) {
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
