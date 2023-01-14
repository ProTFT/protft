import { gql } from "urql";
import { Stage } from "../../../../../../graphql/schema";

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

export type UpdateStageVariables = any & {
  tournamentId: number;
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
    $tiebreakers: [Int!]
    $description: String
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
      tiebreakers: $tiebreakers
    ) {
      id
    }
  }
`;
