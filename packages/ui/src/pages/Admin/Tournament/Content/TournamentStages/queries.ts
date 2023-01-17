import { gql } from "urql";
import { Stage, Tournament } from "../../../../../graphql/schema";

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

export type CreateStageVariables = any & {
  tournamentId: number;
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
  ) {
    createStage(
      tournamentId: $tournamentId
      pointSchemaId: $pointSchemaId
      name: $name
      sequence: $sequence
      isFinal: $isFinal
      description: $description
      roundCount: $roundCount
    ) {
      id
    }
  }
`;
