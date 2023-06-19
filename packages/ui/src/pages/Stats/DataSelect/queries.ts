import { graphql } from "../../../gql";
import { Set, Tournament } from "../../../graphql/schema";

export interface TournamentsQueryResponse {
  tournamentsWithStats: Tournament[];
}

export const TOURNAMENTS_WITH_STATS_QUERY = graphql(`
  query listTournamentsWithStats {
    tournamentsWithStats {
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
  query listTournamentsWithStatsAndFilter($searchQuery: String) {
    tournamentsWithStats(searchQuery: $searchQuery) {
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
