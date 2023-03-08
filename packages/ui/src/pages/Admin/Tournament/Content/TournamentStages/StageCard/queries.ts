import { gql } from "urql";
import { Stage, StageType } from "../../../../../../graphql/schema";

export interface DeleteResult {
  id: number;
}

export interface StageDeleteResult {
  deleteStage: DeleteResult;
}

export const DELETE_STAGE_MUTATION = gql`
  mutation deleteStage($id: Int!) {
    deleteStage(id: $id) {
      id
    }
  }
`;

export interface UpdateStageResult {
  updateStage: { id: Pick<Stage, "id"> };
}

export type UpdateStageVariables = {
  id: number;
  tournamentId: number;
  pointSchemaId: number;
  name: string;
  sequence: number;
  isFinal: boolean;
  roundCount: number;
  description: string;
  qualifiedCount: number;
  stageType: StageType;
};

export const UPDATE_STAGE_MUTATION = gql`
  mutation updateStage(
    $id: Int!
    $tournamentId: Int!
    $pointSchemaId: Int!
    $name: String!
    $sequence: Int!
    $isFinal: Boolean!
    $roundCount: Int!
    $description: String
    $qualifiedCount: Int!
    $stageType: StageType!
  ) {
    updateStage(
      id: $id
      tournamentId: $tournamentId
      pointSchemaId: $pointSchemaId
      name: $name
      sequence: $sequence
      isFinal: $isFinal
      description: $description
      roundCount: $roundCount
      qualifiedCount: $qualifiedCount
      stageType: $stageType
    ) {
      id
    }
  }
`;
