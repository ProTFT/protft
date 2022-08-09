
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

export interface BooleanResult {
    result: boolean;
    error?: Nullable<string>;
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

export interface Round {
    id: number;
    stageId: number;
    sequence: number;
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

export interface PlayerStageResult {
    player: BasePlayer;
    positions: number[];
    points: number[];
}

export interface Stage {
    id: number;
    name: string;
    sequence: number;
    isFinal: boolean;
    tournamentId: number;
    pointSchemaId: number;
    playersResults?: Nullable<PlayerStageResult[]>;
    roundCount: number;
    lobbies?: Nullable<Lobby[]>;
    rounds?: Nullable<Round[]>;
}

export interface BasePlayer {
    id: number;
    name: string;
    region?: Nullable<string>;
    country?: Nullable<string>;
}

export interface PlayerLobbyResult {
    player: BasePlayer;
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
    players?: Nullable<Player[]>;
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
    stages(tournamentId: number): Stage[] | Promise<Stage[]>;
    lobbies(stageId: number): Lobby[] | Promise<Lobby[]>;
    players(region?: Nullable<string>, country?: Nullable<string>): Player[] | Promise<Player[]>;
    player(id: number): Player | Promise<Player>;
    playerFilterMeta(): PlayerFilterMeta | Promise<PlayerFilterMeta>;
}

export interface IMutation {
    createTournament(name: string, setId: number, region?: Nullable<string[]>, host?: Nullable<string>, participantsNumber?: Nullable<number>, prizePool?: Nullable<number>, startDate?: Nullable<DateTime>, endDate?: Nullable<DateTime>): Tournament | Promise<Tournament>;
    createDeepTournament(tournament: DeepTournamentInput): Tournament | Promise<Tournament>;
    createStage(tournamentId: number, pointSchemaId: number, name: string, sequence: number, isFinal: boolean): Stage | Promise<Stage>;
    createLobby(stageId: number, name: string, sequence: number): Lobby | Promise<Lobby>;
    createRound(stageId: number, sequence: number): Round | Promise<Round>;
    createPlayerLobby(lobbyId: number, playerIds: number[]): Round | Promise<Round>;
    createLobbyResult(lobbyId: number, players: PlayerLobbyResultInput[]): BooleanResult | Promise<BooleanResult>;
    createPlayer(name: string, country: string, region: string): Player | Promise<Player>;
}

export type DateTime = any;
type Nullable<T> = T | null;
