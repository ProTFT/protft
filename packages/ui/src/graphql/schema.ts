/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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
  isFinal?: Nullable<boolean>;
  tournamentId: number;
  pointSchemaId: number;
  lobbies?: Nullable<Lobby[]>;
}

export interface PlayerLobbyResult {
  player: Player;
  positions: number[];
  points: number[];
}

export interface Lobby {
  id: number;
  tournamentId: number;
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
  players(
    region?: Nullable<string>,
    country?: Nullable<string>
  ): Player[] | Promise<Player[]>;
  player(id: number): Player | Promise<Player>;
  playerFilterMeta(): PlayerFilterMeta | Promise<PlayerFilterMeta>;
}

export interface IMutation {
  createUser(
    name: string,
    country: string,
    region: string
  ): Player | Promise<Player>;
}

export type DateTime = any;
type Nullable<T> = T | null;
