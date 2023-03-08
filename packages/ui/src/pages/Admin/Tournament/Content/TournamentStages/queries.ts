import { gql } from "urql";
import { Stage, StageType, Tournament } from "../../../../../graphql/schema";

export interface TournamentStageQueryResponse {
  tournament: Tournament;
}

export const TOURNAMENT_STAGES_QUERY = gql`
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      stages {
        id
        name
        description
        sequence
        isFinal
        roundCount
        pointSchemaId
        pointSchema {
          id
          name
        }
      }
    }
  }
`;

export interface CreateStageResult {
  createStage: { id: Pick<Stage, "id"> };
}

export type CreateStageVariables = {
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

export const CREATE_STAGE_MUTATION = gql`
  mutation createStage(
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
    createStage(
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
