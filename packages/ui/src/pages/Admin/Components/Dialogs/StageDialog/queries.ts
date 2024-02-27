import { graphql } from "../../../../../gql";
import { PointSchema } from "../../../../../graphql/schema";

export const POINT_SCHEMA_IDS_QUERY = graphql(`
  query listPointSchemas {
    pointSchemas {
      id
      name
    }
  }
`);

export interface PointSchemasResponse {
  pointSchemas: Pick<PointSchema, "id" | "name">[];
}
