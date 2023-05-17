import { gql } from "urql";
import { Stage, Tiebreaker } from "../../../../../graphql/schema";

export const TIEBREAKERS_QUERY = gql`
  query tiebreakers {
    tiebreakers {
      id
      description
    }
  }
`;

export interface TiebreakersQueryResult {
  tiebreakers: Tiebreaker[];
}

export interface StageQueryResponse {
  stage: Pick<Stage, "id" | "tiebreakers">;
}

export const STAGE_QUERY = gql`
  query stage($id: Int!) {
    stage(id: $id) {
      id
      tiebreakers
    }
  }
`;

export interface UpdateStageTiebreakersResult {
  updateTiebreakers: { id: Pick<Stage, "id"> };
}

export type UpdateStageTiebreakersVariables = {
  id: number;
  tiebreakers: number[];
};

export const UPDATE_STAGE_TIEBREAKERS_MUTATION = gql`
  mutation updateTiebreakers($id: Int!, $tiebreakers: [Int!]!) {
    updateTiebreakers(id: $id, tiebreakers: $tiebreakers) {
      id
    }
  }
`;

export interface CarryOverPointsResult {
  carryOverPointsFromLastStage: { success: boolean };
}

export type CarryOverPointsVariables = {
  stageId: number;
};

export const CARRY_OVER_POINTS_MUTATION = gql`
  mutation carryOverPointsFromLastStage($stageId: Int!) {
    carryOverPointsFromLastStage(stageId: $stageId) {
      success
    }
  }
`;
