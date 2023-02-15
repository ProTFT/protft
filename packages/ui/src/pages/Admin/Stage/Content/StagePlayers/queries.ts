import { gql } from "urql";
import {
  Stage,
  StagePlayerInfo,
  Tournament,
} from "../../../../../graphql/schema";

export interface TournamentPlayersResponse {
  tournament: Tournament;
}

export const TOURNAMENT_PLAYERS_QUERY = gql`
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      players {
        id
        name
        region
      }
    }
  }
`;

export interface StagePlayersResponse {
  stage: Stage;
}

export const STAGE_PLAYERS_QUERY = gql`
  query stage($id: Int!) {
    stage(id: $id) {
      id
      players {
        player {
          id
          name
          region
        }
      }
    }
  }
`;

export interface CreateStagePlayerResult {
  createStagePlayers: { stageId: Pick<StagePlayerInfo, "stageId"> }[];
}

export type CreateStagePlayerVariables = {
  stageId: number;
  playerIds: number[];
};

export const CREATE_STAGE_PLAYER = gql`
  mutation createStagePlayers($stageId: Int!, $playerIds: [Int!]!) {
    createStagePlayers(stageId: $stageId, playerIds: $playerIds) {
      stageId
    }
  }
`;

export type CreateStagePlayerByNameVariables = {
  stageId: number;
  playerNames: string;
};

export const CREATE_STAGE_PLAYER_BY_NAME = gql`
  mutation createStagePlayersByName($stageId: Int!, $playerNames: String!) {
    createStagePlayersByName(stageId: $stageId, playerNames: $playerNames) {
      stageId
    }
  }
`;

export type GetStagePlayerVariables = {
  stageId: number;
  playerId: number;
};

export interface GetStagePlayerResult {
  stagePlayer: StagePlayerInfo;
}

export const GET_STAGE_PLAYER_QUERY = gql`
  query stagePlayer($stageId: Int!, $playerId: Int!) {
    stagePlayer(stageId: $stageId, playerId: $playerId) {
      stageId
      playerId
      extraPoints
      tiebreakerRanking
    }
  }
`;

export type UpdateStagePlayerVariables = {
  stageId: number;
  playerId: number;
  extraPoints?: number;
  tiebreakerRanking?: number;
};

export interface UpdateStagePlayerResult {
  updateStagePlayer: StagePlayerInfo;
}

export const UPDATE_STAGE_PLAYER_MUTATION = gql`
  mutation updateStagePlayer(
    $stageId: Int!
    $playerId: Int!
    $extraPoints: Int
    $tiebreakerRanking: Int
  ) {
    updateStagePlayer(
      stageId: $stageId
      playerId: $playerId
      extraPoints: $extraPoints
      tiebreakerRanking: $tiebreakerRanking
    ) {
      stageId
      playerId
      extraPoints
      tiebreakerRanking
    }
  }
`;
