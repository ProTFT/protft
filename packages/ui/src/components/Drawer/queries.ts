import { gql } from "urql";
import { Set } from "../../graphql/schema";

export interface SetsQueryResponse {
  sets: Set[];
}

export const SETS_QUERY = gql`
  query sets {
    sets {
      id
      name
    }
  }
`;
