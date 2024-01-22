import { graphql } from "../../../../../gql";
import { Tournament } from "../../../../../graphql/schema";

export interface TournamentStageQueryResponse {
  tournament: Tournament;
}

export const TOURNAMENT_STAGES_QUERY = graphql(`
  query oneTournamentWithStagesAndPointSchema($id: Int!) {
    tournament(id: $id) {
      id
      stages {
        id
        name
        description
        sequence
        roundCount
        pointSchemaId
        startDateTime
        pointSchema {
          id
          name
        }
      }
    }
  }
`);

export const CREATE_STAGE_MUTATION = graphql(`
  mutation createStage(
    $tournamentId: Int!
    $pointSchemaId: Int!
    $name: String!
    $sequence: Int!
    $sequenceForResult: Int!
    $roundCount: Int!
    $description: String
    $qualifiedCount: Int!
    $stageType: StageType!
    $startDateTime: String
  ) {
    createStage(
      tournamentId: $tournamentId
      pointSchemaId: $pointSchemaId
      name: $name
      sequence: $sequence
      sequenceForResult: $sequenceForResult
      description: $description
      roundCount: $roundCount
      qualifiedCount: $qualifiedCount
      stageType: $stageType
      startDateTime: $startDateTime
    ) {
      id
    }
  }
`);
