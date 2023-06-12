import { graphql } from "../../../gql";
import { Stage, Tournament } from "../../../graphql/schema";

export interface StageQueryResponse {
  stage: Stage;
}

export const STAGE_QUERY = graphql(`
  query oneStage($id: Int!) {
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
`);

export interface TournamentQueryResponse {
  tournament: Tournament;
}

export const TOURNAMENT_QUERY = graphql(`
  query oneTournamentWithSet($id: Int!) {
    tournament(id: $id) {
      id
      name
      set {
        id
        name
      }
    }
  }
`);
