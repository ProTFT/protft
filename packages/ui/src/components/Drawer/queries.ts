import { graphql } from "../../gql";
import { Set } from "../../graphql/schema";

export interface SetsQueryResponse {
  sets: Set[];
}

export const SETS_QUERY = graphql(`
  query sets {
    sets {
      id
      name
    }
  }
`);
