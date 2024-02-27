import { graphql } from "../../../../../gql";
import {
  Stage,
  StagePlayerInfo,
  Tournament,
} from "../../../../../graphql/schema";

export interface TournamentPlayersResponse {
  tournament: Tournament;
}

export const TOURNAMENT_PLAYERS_QUERY = graphql(`
  query oneTournamentWithPlayers($id: Int!) {
    tournament(id: $id) {
      id
      players {
        id
        name
        region
      }
    }
  }
`);

export interface StagePlayersResponse {
  stage: Stage;
}

export const STAGE_PLAYERS_QUERY = graphql(`
  query oneStageIwthPlayers($id: Int!) {
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
`);

export interface CreateStagePlayerResult {
  createStagePlayers: { id: Pick<Stage, "id"> };
}

export type CreateStagePlayerVariables = {
  stageId: number;
  playerIds: number[];
};

export const CREATE_STAGE_PLAYER = graphql(`
  mutation createStagePlayers($stageId: Int!, $playerIds: [Int!]!) {
    createStagePlayers(stageId: $stageId, playerIds: $playerIds) {
      id
    }
  }
`);

export type CreateStagePlayerByNameVariables = {
  stageId: number;
  playerNames: string;
};

export const CREATE_STAGE_PLAYER_BY_NAME = graphql(`
  mutation createStagePlayersByName($stageId: Int!, $playerNames: String!) {
    createStagePlayersByName(stageId: $stageId, playerNames: $playerNames) {
      id
    }
  }
`);

export type GetStagePlayerVariables = {
  stageId: number;
  playerId: number;
};

export interface GetStagePlayerResult {
  stagePlayer: StagePlayerInfo;
}

export const GET_STAGE_PLAYER_QUERY = graphql(`
  query oneStagePlayer($stageId: Int!, $playerId: Int!) {
    stagePlayer(stageId: $stageId, playerId: $playerId) {
      stageId
      playerId
      extraPoints
      tiebreakerRanking
    }
  }
`);

export type UpdateStagePlayerVariables = {
  stageId: number;
  playerId: number;
  extraPoints?: number;
  tiebreakerRanking?: number;
};

export interface UpdateStagePlayerResult {
  updateStagePlayer: StagePlayerInfo;
}

export const UPDATE_STAGE_PLAYER_MUTATION = graphql(`
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
`);
