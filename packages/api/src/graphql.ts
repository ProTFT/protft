
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum StageType {
    RANKING = "RANKING",
    GROUP_BASED = "GROUP_BASED"
}

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

export interface Set {
    id: number;
    name: string;
}

export interface PlayerLink {
    id: number;
    playerId: number;
    type: string;
    link: string;
}

export interface PlayerCalculatedStats {
    averagePosition: number;
    totalGames: number;
    topFourCount: number;
    topOneCount: number;
    eigthCount: number;
}

export interface Player {
    id: number;
    name: string;
    playerStats?: Nullable<PlayerCalculatedStats>;
    links: PlayerLink[];
    region?: Nullable<string>;
    country?: Nullable<string>;
    slug: string;
    alias: string[];
}

export interface RoundResult {
    roundId: number;
    lobbyPlayerId: number;
    position: number;
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
    nextStartTime?: Nullable<number>;
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
    tournamentId: number;
    pointSchemaId: number;
    tiebreakers: number[];
    stageType: StageType;
    qualifiedCount: number;
    roundCount: number;
    startDateTime?: Nullable<string>;
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
    order: number;
}

export interface SuccessResponse {
    success: boolean;
}

export interface PlayerWithStats {
    averagePosition: number;
    totalGames: number;
    topFourCount: number;
    topOneCount: number;
    eigthCount: number;
    player: Player;
}

export interface PlayerResults {
    player: Player;
    positions: number[];
    points: number[];
    lobbyPlayerId: number;
}

export interface LobbyGroupWithLobbies {
    id: number;
    stageId: number;
    sequence: number;
    roundsPlayed: number;
    lobbies: LobbyWithResults[];
}

export interface LobbyWithResults {
    id: number;
    stageId: number;
    name: string;
    sequence: number;
    players: Player[];
    results: PlayerResults[];
}

export interface TournamentResult {
    tournamentId: number;
    playerId: number;
    finalPosition: string;
    qualifyTo: number[];
    prize: number;
    currency: string;
    prizeInUSD: number;
    circuitId: number;
    circuitPointsEarned: number;
    otherRewards: string;
}

export interface PlayerFilterMeta {
    possibleCountries: string[];
    possibleRegions: string[];
}

export interface TournamentsPlayed {
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
    nextStartTime?: Nullable<number>;
    set: Set;
    stages?: Nullable<Stage[]>;
    players?: Nullable<Player[]>;
    finalPosition?: Nullable<string>;
}

export interface TournamentStream {
    tournamentId: number;
    name: string;
    link: string;
    platform: string;
    language: string;
    isLive: boolean;
    isVOD: boolean;
}

export interface Circuit {
    id: number;
    name: string;
    region: string[];
    setId: number;
    slug: string;
    set: Set;
}

export interface IQuery {
    sets(): Set[] | Promise<Set[]>;
    set(id: number): Nullable<Set> | Promise<Nullable<Set>>;
    tournaments(region?: Nullable<string[]>, setId?: Nullable<number[]>, searchQuery?: Nullable<string>, take?: Nullable<number>, skip?: Nullable<number>): Tournament[] | Promise<Tournament[]>;
    adminTournaments(region?: Nullable<string[]>, setId?: Nullable<number[]>, searchQuery?: Nullable<string>, take?: Nullable<number>, skip?: Nullable<number>): Tournament[] | Promise<Tournament[]>;
    tournament(id: number): Tournament | Promise<Tournament>;
    tournamentBySlug(slug: string): Tournament | Promise<Tournament>;
    ongoingTournaments(): Tournament[] | Promise<Tournament[]>;
    upcomingTournaments(region?: Nullable<string[]>, setId?: Nullable<number[]>, searchQuery?: Nullable<string>, take?: Nullable<number>, skip?: Nullable<number>): Tournament[] | Promise<Tournament[]>;
    pastTournaments(region?: Nullable<string[]>, setId?: Nullable<number[]>, searchQuery?: Nullable<string>, take?: Nullable<number>, skip?: Nullable<number>): Tournament[] | Promise<Tournament[]>;
    tournamentsWithStats(searchQuery?: Nullable<string>, setIds?: Nullable<number[]>): Tournament[] | Promise<Tournament[]>;
    stages(tournamentId: number): Stage[] | Promise<Stage[]>;
    stage(id: number): Stage | Promise<Stage>;
    playersFromPreviousStage(id: number): StagePlayerInfo[] | Promise<StagePlayerInfo[]>;
    tiebreakers(): Tiebreaker[] | Promise<Tiebreaker[]>;
    stagePlayer(stageId: number, playerId: number): StagePlayerInfo | Promise<StagePlayerInfo>;
    lobbies(lobbyGroupId: number): Lobby[] | Promise<Lobby[]>;
    pointSchemas(): PointSchema[] | Promise<PointSchema[]>;
    pointSchema(id: number): Nullable<PointSchema> | Promise<Nullable<PointSchema>>;
    players(region?: Nullable<string>, country?: Nullable<string>, searchQuery?: Nullable<string>, take?: Nullable<number>, skip?: Nullable<number>): Player[] | Promise<Player[]>;
    adminPlayers(region?: Nullable<string>, country?: Nullable<string>, searchQuery?: Nullable<string>, take?: Nullable<number>, skip?: Nullable<number>): Player[] | Promise<Player[]>;
    player(id: number): Player | Promise<Player>;
    playerBySlug(slug: string): Player | Promise<Player>;
    playerFilterMeta(): PlayerFilterMeta | Promise<PlayerFilterMeta>;
    tournamentsPlayed(playerId: number): TournamentsPlayed[] | Promise<TournamentsPlayed[]>;
    resultsByStage(stageId: number): PlayerResults[] | Promise<PlayerResults[]>;
    lobbyResultsByStage(stageId: number): LobbyGroupWithLobbies[] | Promise<LobbyGroupWithLobbies[]>;
    resultsByLobbyGroup(lobbyGroupId: number): PlayerResults[] | Promise<PlayerResults[]>;
    playerStats(setIds?: Nullable<number[]>, tournamentIds?: Nullable<number[]>, regions?: Nullable<string[]>, sort?: Nullable<SortOption>, searchQuery?: Nullable<string>, take?: Nullable<number>, skip?: Nullable<number>, minimumGames?: Nullable<number>): PlayerWithStats[] | Promise<PlayerWithStats[]>;
    resultsOfTournament(tournamentId: number): TournamentResult[] | Promise<TournamentResult[]>;
    playerLink(id: number): PlayerLink | Promise<PlayerLink>;
    streamsOfTournament(tournamentId: number): TournamentStream[] | Promise<TournamentStream[]>;
    circuits(): Circuit[] | Promise<Circuit[]>;
    circuit(id: number): Nullable<Circuit> | Promise<Nullable<Circuit>>;
}

export interface IMutation {
    createTournament(name: string, setId: number, region: string[], host?: Nullable<string>, participantsNumber?: Nullable<number>, prizePool?: Nullable<number>, currency?: Nullable<string>, startDate?: Nullable<DateTime>, endDate?: Nullable<DateTime>): Tournament | Promise<Tournament>;
    updateTournament(id: number, name?: Nullable<string>, setId?: Nullable<number>, region?: Nullable<string[]>, host?: Nullable<string>, participantsNumber?: Nullable<number>, prizePool?: Nullable<number>, currency?: Nullable<string>, startDate?: Nullable<DateTime>, endDate?: Nullable<DateTime>, visibility?: Nullable<boolean>): Tournament | Promise<Tournament>;
    deleteTournament(id: number): DeleteResponse | Promise<DeleteResponse>;
    createTournamentPlayers(tournamentId: number, playerIds: number[]): Tournament | Promise<Tournament>;
    createTournamentPlayersByName(tournamentId: number, playerNames: string): Tournament | Promise<Tournament>;
    createTournamentSlugs(): Tournament[] | Promise<Tournament[]>;
    createStage(tournamentId: number, pointSchemaId: number, name: string, sequence: number, stageType: StageType, roundCount: number, qualifiedCount?: Nullable<number>, tiebreakers?: Nullable<number[]>, description?: Nullable<string>, startDateTime?: Nullable<string>): Stage | Promise<Stage>;
    updateStage(id: number, tournamentId: number, pointSchemaId: number, name: string, sequence: number, qualifiedCount: number, stageType: StageType, roundCount: number, tiebreakers?: Nullable<number[]>, description?: Nullable<string>, startDateTime?: Nullable<string>): Stage | Promise<Stage>;
    updateTiebreakers(id: number, tiebreakers: number[]): Stage | Promise<Stage>;
    deleteStage(id: number): DeleteResponse | Promise<DeleteResponse>;
    createStagePlayers(stageId: number, playerIds: number[]): Stage | Promise<Stage>;
    generateLobbies(stageId: number, roundsPerLobbyGroup: number): CreateLobbiesResponse | Promise<CreateLobbiesResponse>;
    createStagePlayersByName(stageId: number, playerNames: string): Stage | Promise<Stage>;
    updateStagePlayer(stageId: number, playerId: number, extraPoints?: Nullable<number>, tiebreakerRanking?: Nullable<number>): StagePlayerInfo | Promise<StagePlayerInfo>;
    applyTiebreakersToAllStages(stageId: number): Stage[] | Promise<Stage[]>;
    createLobby(stageId: number, sequence: number, lobbyGroupId: number, name?: Nullable<string>): Lobby | Promise<Lobby>;
    createNLobby(stageId: number, lobbyGroupId: number, quantity: number): Lobby[] | Promise<Lobby[]>;
    updateLobby(id: number, stageId: number, sequence: number, lobbyGroupId: number, name?: Nullable<string>): Lobby | Promise<Lobby>;
    deleteLobby(id: number): DeleteResponse | Promise<DeleteResponse>;
    deleteLobbyGroups(stageId: number): DeleteResponse | Promise<DeleteResponse>;
    createRound(stageId: number, sequence: number): Round | Promise<Round>;
    createLobbyGroup(stageId: number, sequence: number, roundsPlayed: number): LobbyGroup | Promise<LobbyGroup>;
    createNLobbyGroup(stageId: number, quantity: number, roundsPlayed: number): LobbyGroup[] | Promise<LobbyGroup[]>;
    createLobbyPlayers(lobbies: CreatePlayerLobbyArgs[]): LobbyPlayerInfo[] | Promise<LobbyPlayerInfo[]>;
    createPlayer(name: string, country: string, region: string, alias?: Nullable<string[]>): Player | Promise<Player>;
    updatePlayer(id: number, name?: Nullable<string>, country?: Nullable<string>, region?: Nullable<string>, slug?: Nullable<string>, alias?: Nullable<string[]>): Player | Promise<Player>;
    createPlayerSlugs(): Player[] | Promise<Player[]>;
    deletePlayer(id: number): Player | Promise<Player>;
    mergePlayer(playerIdToMaintain: number, playerIdToRemove: number): Player | Promise<Player>;
    createLobbyGroupResult(lobbyGroupId: number, results: CreateLobbyGroupResults[]): RoundResult[] | Promise<RoundResult[]>;
    carryOverPointsFromLastStage(stageId: number): SuccessResponse | Promise<SuccessResponse>;
    lockTournament(id: number): TournamentResult[] | Promise<TournamentResult[]>;
    deleteTournamentResults(id: number): DeleteResponse | Promise<DeleteResponse>;
    createPlayerLink(playerId: number, type: string, link: string): PlayerLink | Promise<PlayerLink>;
    updatePlayerLink(id: number, type?: Nullable<string>, link?: Nullable<string>): PlayerLink | Promise<PlayerLink>;
    deletePlayerLink(id: number): DeleteResponse | Promise<DeleteResponse>;
    addTournamentStream(tournamentId: number, name: string, link: string, platform: string, language: string, isLive: boolean, isVOD: boolean): TournamentStream | Promise<TournamentStream>;
    deleteTournamentStream(tournamentId: number, name: string): DeleteResponse | Promise<DeleteResponse>;
    createCircuit(name: string, setId: number, region: string[]): Circuit | Promise<Circuit>;
    updateCircuit(id: number, name?: Nullable<string>, setId?: Nullable<number>, region?: Nullable<string[]>): Circuit | Promise<Circuit>;
    deleteCircuit(id: number): DeleteResponse | Promise<DeleteResponse>;
}

export type DateTime = any;
type Nullable<T> = T | null;
