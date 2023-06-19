import { graphql } from "../../../../../../gql";
import { Stage, StageType } from "../../../../../../graphql/schema";

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

export interface UpdateStageResult {
  updateStage: { id: Pick<Stage, "id"> };
}

export type UpdateStageVariables = {
  id: number;
  tournamentId: number;
  pointSchemaId: number;
  name: string;
  sequence: number;
  roundCount: number;
  description: string;
  qualifiedCount: number;
  stageType: StageType;
  startDateTime?: string;
};

export const UPDATE_STAGE_MUTATION = graphql(`
  mutation updateStage(
    $id: Int!
    $tournamentId: Int!
    $pointSchemaId: Int!
    $name: String!
    $sequence: Int!
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
