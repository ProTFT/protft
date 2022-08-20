/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface DeepTournamentInput {
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
  rounds: RoundInput[];
  players: PlayerInput[];
}

export interface RoundInput {
  sequence: number;
}

export interface PlayerInput {
  id: number;
}

export interface PlayerLobbyResultInput {
  playerId: number;
  positions: PositionResultInput[];
}

export interface PositionResultInput {
  roundId: number;
  position: number;
}

export interface Set {
  id: number;
  name: string;
}

export interface PlayerStats {
  averagePosition: number;
  totalGames: number;
  topFourCount: number;
  topOneCount: number;
  eigthCount: number;
}

export interface Player {
  id: number;
  name: string;
  playerStats?: Nullable<PlayerStats>;
  region?: Nullable<string>;
  country?: Nullable<string>;
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
  roundCount: number;
  lobbies?: Nullable<Lobby[]>;
  rounds?: Nullable<Round[]>;
}

export interface Lobby {
  id: number;
  stageId: number;
  name: string;
  sequence: number;
  players?: Nullable<Player[]>;
}

export interface Round {
  id: number;
  stageId: number;
  sequence: number;
}

export interface TournamentOverview {
  pastTournaments: Tournament[];
  liveTournaments: Tournament[];
  upcomingTournaments: Tournament[];
}

export interface BooleanResult {
  result: boolean;
  error?: Nullable<string>;
}

export interface PlayerResults {
  player: Player;
  positions: number[];
  points: number[];
}

export interface PlayerFilterMeta {
  possibleCountries: string[];
  possibleRegions: string[];
}

export interface IQuery {
  sets(): Set[] | Promise<Set[]>;
  set(id: number): Nullable<Set> | Promise<Nullable<Set>>;
  tournaments(): Tournament[] | Promise<Tournament[]>;
  tournament(id: number): Tournament | Promise<Tournament>;
  tournamentOverview(): TournamentOverview | Promise<TournamentOverview>;
  stages(tournamentId: number): Stage[] | Promise<Stage[]>;
  lobbies(stageId: number): Lobby[] | Promise<Lobby[]>;
  tournamentsPlayed(playerId: number): Tournament[] | Promise<Tournament[]>;
  players(
    region?: Nullable<string>,
    country?: Nullable<string>
  ): Player[] | Promise<Player[]>;
  player(id: number): Player | Promise<Player>;
  playerFilterMeta(): PlayerFilterMeta | Promise<PlayerFilterMeta>;
  resultsByStage(stageId: number): PlayerResults[] | Promise<PlayerResults[]>;
  resultsByLobby(lobbyId: number): PlayerResults[] | Promise<PlayerResults[]>;
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
    tournament: DeepTournamentInput
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
  createRound(stageId: number, sequence: number): Round | Promise<Round>;
  createPlayerLobby(
    lobbyId: number,
    playerIds: number[]
  ): Round | Promise<Round>;
  createPlayer(
    name: string,
    country: string,
    region: string
  ): Player | Promise<Player>;
  createLobbyResult(
    lobbyId: number,
    players: PlayerLobbyResultInput[]
  ): BooleanResult | Promise<BooleanResult>;
}

export type DateTime = any;
type Nullable<T> = T | null;
