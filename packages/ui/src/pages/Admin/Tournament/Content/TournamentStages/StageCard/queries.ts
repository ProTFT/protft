import { graphql } from "../../../../../../gql";

export interface DeleteResult {
  id: number;
}

export interface StageDeleteResult {
  deleteStage: DeleteResult;
}

export const DELETE_STAGE_MUTATION = graphql(`
  mutation deleteStage($id: Int!) {
    deleteStage(id: $id) {
      id
    }
  }
`);

export const UPDATE_STAGE_MUTATION = graphql(`
  mutation updateStage(
    $id: Int!
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
    updateStage(
      id: $id
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
