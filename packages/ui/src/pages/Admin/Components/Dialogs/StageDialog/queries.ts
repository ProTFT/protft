import { gql } from "urql";
import { PointSchema } from "../../../../../graphql/schema";

export const POINT_SCHEMA_IDS_QUERY = gql`
  query {
    pointSchemas {
      id
      name
    }
  }
`;

export interface PointSchemasResponse {
  pointSchemas: Pick<PointSchema, "id" | "name">[];
}
