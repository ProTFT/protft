import { graphql } from "../../../gql";
import { Set } from "../../../graphql/schema";

export const TOURNAMENTS_WITH_STATS_QUERY = graphql(`
  query listTournamentsWithStats($setIds: [Int!]) {
    tournamentsWithStats(setIds: $setIds) {
      id
      name
      set {
        id
        name
      }
    }
  }
`);

export const TOURNAMENTS_WITH_STATS_AND_FILTER_QUERY = graphql(`
  query listTournamentsWithStatsAndFilter(
    $searchQuery: String
    $setIds: [Int!]
  ) {
    tournamentsWithStats(searchQuery: $searchQuery, setIds: $setIds) {
      id
      name
      set {
        id
        name
      }
    }
  }
`);

export interface SetsQueryResponse {
  sets: Set[];
}

export const SETS_QUERY = graphql(`
  query listSets {
    sets {
      id
      name
    }
  }
`);
