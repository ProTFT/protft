import { graphql } from "../../../gql";

export const STAGE_QUERY = graphql(`
  query oneStage($id: Int!) {
    stage(id: $id) {
      id
      name
      description
      sequence
      sequenceForResult
      pointSchemaId
      roundCount
      qualifiedCount
      stageType
      startDateTime
    }
  }
`);

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
