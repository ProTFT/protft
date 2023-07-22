import { graphql } from "../../../../../gql";

export const TIEBREAKERS_QUERY = graphql(`
  query tiebreakers {
    tiebreakers {
      id
      description
    }
  }
`);

export const STAGE_QUERY = graphql(`
  query oneStageTiebreakers($id: Int!) {
    stage(id: $id) {
      id
      tiebreakers
    }
  }
`);

export const UPDATE_STAGE_TIEBREAKERS_MUTATION = graphql(`
  mutation updateTiebreakers($id: Int!, $tiebreakers: [Int!]!) {
    updateTiebreakers(id: $id, tiebreakers: $tiebreakers) {
      id
    }
  }
`);

export const CARRY_OVER_POINTS_MUTATION = graphql(`
  mutation carryOverPointsFromLastStage($stageId: Int!) {
    carryOverPointsFromLastStage(stageId: $stageId) {
      success
    }
  }
`);

export const APPLY_TIEBREAKER_TO_ALL_MUTATION = graphql(`
  mutation applyTiebreakersToAllStages($stageId: Int!) {
    applyTiebreakersToAllStages(stageId: $stageId) {
      id
    }
  }
`);
