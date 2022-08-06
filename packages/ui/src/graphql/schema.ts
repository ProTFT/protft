/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface TournamentInput {
  name: string;
  region?: Nullable<string[]>;
  host?: Nullable<string>;
  participantsNumber?: Nullable<number>;
  prizePool?: Nullable<number>;
  startDate?: Nullable<DateTime>;
  endDate?: Nullable<DateTime>;
  setId: number;
  stages: StageInput[];
}

export interface StageInput {
  name: string;
  sequence: number;
  isFinal: boolean;
  pointSchemaId: number;
  lobbies: LobbyInput[];
}

export interface LobbyInput {
  name: string;
  sequence: number;
  roundCount: number;
  rounds: RoundInput[];
  players: PlayerInput[];
}

export interface RoundInput {
  sequence: number;
}

export interface PlayerInput {
  id: number;
}

export interface Set {
  id: number;
  name: string;
}

export interface Player {
  id: number;
  name: string;
  region?: Nullable<string>;
  country?: Nullable<string>;
}

export interface PlayerFilterMeta {
  possibleCountries: string[];
  possibleRegions: string[];
}

export interface Tournament {
  id: number;
  name: string;
  region?: Nullable<string[]>;
  host?: Nullable<string>;
  participantsNumber?: Nullable<number>;
  prizePool?: Nullable<number>;
  startDate?: Nullable<DateTime>;
  endDate?: Nullable<DateTime>;
  setId: number;
  set: Set;
  stages?: Nullable<Stage[]>;
}

export interface Stage {
  id: number;
  name: string;
  sequence: number;
  isFinal: boolean;
  tournamentId: number;
  pointSchemaId: number;
  lobbies?: Nullable<Lobby[]>;
  rounds?: Nullable<Lobby[]>;
}

export interface PlayerLobbyResult {
  player: Player;
  positions: number[];
  points: number[];
}

export interface Lobby {
  id: number;
  stageId: number;
  name: string;
  sequence: number;
  roundCount: number;
  playersResults?: Nullable<PlayerLobbyResult[]>;
}

export interface IQuery {
  sets(): Set[] | Promise<Set[]>;
  set(id: number): Nullable<Set> | Promise<Nullable<Set>>;
  tournaments(): Tournament[] | Promise<Tournament[]>;
  tournament(id: number): Tournament | Promise<Tournament>;
  stages(tournamentId: number): Stage[] | Promise<Stage[]>;
  lobbies(stageId: number): Lobby[] | Promise<Lobby[]>;
  players(
    region?: Nullable<string>,
    country?: Nullable<string>
  ): Player[] | Promise<Player[]>;
  player(id: number): Player | Promise<Player>;
  playerFilterMeta(): PlayerFilterMeta | Promise<PlayerFilterMeta>;
}

export interface IMutation {
  createTournament(
    name: string,
    setId: number,
    region?: Nullable<string[]>,
    host?: Nullable<string>,
    participantsNumber?: Nullable<number>,
    prizePool?: Nullable<number>,
    startDate?: Nullable<DateTime>,
    endDate?: Nullable<DateTime>
  ): Tournament | Promise<Tournament>;
  createDeepTournament(
    tournament: TournamentInput
  ): Tournament | Promise<Tournament>;
  createStage(
    tournamentId: number,
    pointSchemaId: number,
    name: string,
    sequence: number,
    isFinal: boolean
  ): Stage | Promise<Stage>;
  createLobby(
    stageId: number,
    name: string,
    sequence: number
  ): Lobby | Promise<Lobby>;
  createUser(
    name: string,
    country: string,
    region: string
  ): Player | Promise<Player>;
}

export type DateTime = any;
type Nullable<T> = T | null;
