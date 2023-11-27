import { graphql } from "../../../../../gql";
import { Stage, StageType, Tournament } from "../../../../../graphql/schema";

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

export interface CreateStageResult {
  createStage: { id: Pick<Stage, "id"> };
}

export type CreateStageVariables = {
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

export const CREATE_STAGE_MUTATION = graphql(`
  mutation createStage(
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
    createStage(
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
