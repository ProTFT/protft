import { gql } from "urql";
import { Stage, Tournament } from "../../../graphql/schema";

export interface StageQueryResponse {
  stage: Stage;
}

export const STAGE_QUERY = gql`
  query stage($id: Int!) {
    stage(id: $id) {
      id
      name
      description
      sequence
      pointSchemaId
      roundCount
      qualifiedCount
      stageType
      startDateTime
    }
  }
`;

export interface TournamentQueryResponse {
  tournament: Tournament;
}

export const TOURNAMENT_QUERY = gql`
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      name
      set {
        id
        name
      }
    }
  }
`;
