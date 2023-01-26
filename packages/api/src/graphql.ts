
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface SortOption {
    column: string;
    asc: boolean;
}

export interface CreatePlayerLobbyArgs {
    lobbyId: number;
    playerIds: number[];
}

export interface CreateLobbyGroupResults {
    lobbyPlayerId: number;
    positions: number[];
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

export interface PlayersStats {
    averagePosition: number;
    totalGames: number;
    topFourCount: number;
    topOneCount: number;
    eigthCount: number;
    player: Player;
}

export interface Player {
    id: number;
    name: string;
    playerStats?: Nullable<PlayerStats>;
    region?: Nullable<string>;
    country?: Nullable<string>;
    slug: string;
}

export interface Round {
    id: number;
    stageId: number;
    sequence: number;
}

export interface PointSchema {
    id: number;
    name: string;
}

export interface Tournament {
    id: number;
    name: string;
    region?: Nullable<string[]>;
    host?: Nullable<string>;
    participantsNumber?: Nullable<number>;
    prizePool?: Nullable<number>;
    currency?: Nullable<string>;
    startDate?: Nullable<DateTime>;
    endDate?: Nullable<DateTime>;
    setId: number;
    slug: string;
    visibility: boolean;
    set: Set;
    stages?: Nullable<Stage[]>;
    players?: Nullable<Player[]>;
}

export interface StagePlayerInfo {
    stageId: number;
    playerId: number;
    extraPoints: number;
    tiebreakerRanking: number;
    player: Player;
}

export interface LobbyGroup {
    id: number;
    stageId: number;
    sequence: number;
    roundsPlayed: number;
}

export interface Stage {
    id: number;
    name: string;
    description: string;
    sequence: number;
    isFinal: boolean;
    tournamentId: number;
    pointSchemaId: number;
    tiebreakers: number[];
    roundCount: number;
    players: StagePlayerInfo[];
    lobbies?: Nullable<Lobby[]>;
    lobbyGroups: LobbyGroup[];
    rounds?: Nullable<Round[]>;
    pointSchema: PointSchema;
}

export interface Lobby {
    id: number;
    stageId: number;
    name: string;
    sequence: number;
    players: Player[];
}

export interface LobbyPlayerInfo {
    id: number;
    lobbyId: number;
    playerId: number;
}

export interface DeleteResponse {
    id: number;
}

export interface CreateLobbiesResponse {
    createdLobbyGroups: number;
    createdLobbies: number;
}

export interface Tiebreaker {
    id: number;
    description: string;
}

export interface BooleanResult {
    result: boolean;
    error?: Nullable<string>;
}

export interface PlayerResults {
    player: Player;
    positions: number[];
    points: number[];
    lobbyPlayerId: number;
}

export interface PlayerFilterMeta {
    possibleCountries: string[];
    possibleRegions: string[];
}

export interface IQuery {
    sets(): Set[] | Promise<Set[]>;
    set(id: number): Nullable<Set> | Promise<Nullable<Set>>;
    tournaments(searchQuery?: Nullable<string>): Tournament[] | Promise<Tournament[]>;
    adminTournaments(searchQuery?: Nullable<string>): Tournament[] | Promise<Tournament[]>;
    tournament(id: number): Tournament | Promise<Tournament>;
    tournamentBySlug(slug: string): Tournament | Promise<Tournament>;
    ongoingTournaments(): Tournament[] | Promise<Tournament[]>;
    upcomingTournaments(searchQuery?: Nullable<string>): Tournament[] | Promise<Tournament[]>;
    pastTournaments(searchQuery?: Nullable<string>): Tournament[] | Promise<Tournament[]>;
    stages(tournamentId: number): Stage[] | Promise<Stage[]>;
    stage(id: number): Stage | Promise<Stage>;
    playersFromPreviousStage(id: number): StagePlayerInfo[] | Promise<StagePlayerInfo[]>;
    tiebreakers(): Tiebreaker[] | Promise<Tiebreaker[]>;
    lobbies(lobbyGroupId: number): Lobby[] | Promise<Lobby[]>;
    pointSchemas(): PointSchema[] | Promise<PointSchema[]>;
    pointSchema(id: number): Nullable<PointSchema> | Promise<Nullable<PointSchema>>;
    tournamentsPlayed(playerId: number): Tournament[] | Promise<Tournament[]>;
    players(region?: Nullable<string>, country?: Nullable<string>, searchQuery?: Nullable<string>, take?: Nullable<number>, skip?: Nullable<number>): Player[] | Promise<Player[]>;
    player(id: number): Player | Promise<Player>;
    playerBySlug(slug: string): Player | Promise<Player>;
    playerFilterMeta(): PlayerFilterMeta | Promise<PlayerFilterMeta>;
    resultsByStage(stageId: number): PlayerResults[] | Promise<PlayerResults[]>;
    resultsByLobbyGroup(lobbyGroupId: number): PlayerResults[] | Promise<PlayerResults[]>;
    playerStats(setId?: Nullable<number>, tournamentIds?: Nullable<number[]>, region?: Nullable<string>, sort?: Nullable<SortOption>, searchQuery?: Nullable<string>, take?: Nullable<number>, skip?: Nullable<number>): PlayersStats[] | Promise<PlayersStats[]>;
}

export interface IMutation {
    createTournament(name: string, setId: number, region?: Nullable<string[]>, host?: Nullable<string>, participantsNumber?: Nullable<number>, prizePool?: Nullable<number>, currency?: Nullable<string>, startDate?: Nullable<DateTime>, endDate?: Nullable<DateTime>): Tournament | Promise<Tournament>;
    updateTournament(id: number, name?: Nullable<string>, setId?: Nullable<number>, region?: Nullable<string[]>, host?: Nullable<string>, participantsNumber?: Nullable<number>, prizePool?: Nullable<number>, currency?: Nullable<string>, startDate?: Nullable<DateTime>, endDate?: Nullable<DateTime>, visibility?: Nullable<boolean>): Tournament | Promise<Tournament>;
    deleteTournament(id: number): DeleteResponse | Promise<DeleteResponse>;
    createTournamentPlayers(tournamentId: number, playerIds: number[]): Tournament | Promise<Tournament>;
    createTournamentSlugs(): Tournament[] | Promise<Tournament[]>;
    createStage(tournamentId: number, pointSchemaId: number, name: string, sequence: number, isFinal: boolean, roundCount: number, tiebreakers?: Nullable<number[]>, description?: Nullable<string>): Stage | Promise<Stage>;
    updateStage(id: number, tournamentId: number, pointSchemaId: number, name: string, sequence: number, isFinal: boolean, roundCount: number, tiebreakers?: Nullable<number[]>, description?: Nullable<string>): Stage | Promise<Stage>;
    updateTiebreakers(id: number, tiebreakers: number[]): Stage | Promise<Stage>;
    deleteStage(id: number): DeleteResponse | Promise<DeleteResponse>;
    createStagePlayers(stageId: number, playerIds: number[]): StagePlayerInfo[] | Promise<StagePlayerInfo[]>;
    generateLobbies(stageId: number, roundsPerLobbyGroup: number): CreateLobbiesResponse | Promise<CreateLobbiesResponse>;
    createLobby(stageId: number, name: string, sequence: number, lobbyGroupId: number): Lobby | Promise<Lobby>;
    updateLobby(id: number, stageId: number, name: string, sequence: number, lobbyGroupId: number): Lobby | Promise<Lobby>;
    deleteLobby(id: number): DeleteResponse | Promise<DeleteResponse>;
    createRound(stageId: number, sequence: number): Round | Promise<Round>;
    createPlayerLobbyGroup(lobbyGroupId: number, players: CreatePlayerLobbyArgs[]): LobbyPlayerInfo[] | Promise<LobbyPlayerInfo[]>;
    createPlayer(name: string, country: string, region: string): Player | Promise<Player>;
    createPlayerSlugs(): Player[] | Promise<Player[]>;
    createLobbyGroupResult(lobbyGroupId: number, results: CreateLobbyGroupResults[]): BooleanResult | Promise<BooleanResult>;
    createLobbyResult(lobbyId: number, players: PlayerLobbyResultInput[]): BooleanResult | Promise<BooleanResult>;
}

export type DateTime = any;
type Nullable<T> = T | null;
