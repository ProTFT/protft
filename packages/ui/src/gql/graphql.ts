/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Circuit = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  region: Array<Scalars['String']['output']>;
  set: Set;
  setId: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
};

export type CreateLobbiesResponse = {
  createdLobbies: Scalars['Int']['output'];
  createdLobbyGroups: Scalars['Int']['output'];
};

export type CreateLobbyGroupResults = {
  lobbyPlayerId: Scalars['Int']['input'];
  positions: Array<Scalars['Int']['input']>;
};

export type CreatePlayerLobbyArgs = {
  lobbyId: Scalars['Int']['input'];
  playerIds: Array<Scalars['Int']['input']>;
};

export type DeleteResponse = {
  id: Scalars['Int']['output'];
};

export type Lobby = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  players: Array<Player>;
  sequence: Scalars['Int']['output'];
  stageId: Scalars['Int']['output'];
};

export type LobbyGroup = {
  id: Scalars['Int']['output'];
  roundsPlayed: Scalars['Int']['output'];
  sequence: Scalars['Int']['output'];
  stageId: Scalars['Int']['output'];
};

export type LobbyGroupWithLobbies = {
  id: Scalars['Int']['output'];
  lobbies: Array<LobbyWithResults>;
  roundsPlayed: Scalars['Int']['output'];
  sequence: Scalars['Int']['output'];
  stageId: Scalars['Int']['output'];
};

export type LobbyPlayerInfo = {
  id: Scalars['Int']['output'];
  lobbyId: Scalars['Int']['output'];
  playerId: Scalars['Int']['output'];
};

export type LobbyWithResults = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  players: Array<Player>;
  results: Array<PlayerResults>;
  sequence: Scalars['Int']['output'];
  stageId: Scalars['Int']['output'];
};

export type Mutation = {
  addTournamentStream: TournamentStream;
  carryOverPointsFromLastStage: SuccessResponse;
  createCircuit: Circuit;
  createLobby: Lobby;
  createLobbyGroup: LobbyGroup;
  createLobbyGroupResult: Array<RoundResult>;
  createLobbyPlayers: Array<LobbyPlayerInfo>;
  createNLobby: Array<Lobby>;
  createNLobbyGroup: Array<LobbyGroup>;
  createPlayer: Player;
  createPlayerLink: PlayerLink;
  createPlayerSlugs: Array<Player>;
  createRound: Round;
  createStage: Stage;
  createStagePlayers: Stage;
  createStagePlayersByName: Stage;
  createTournament: Tournament;
  createTournamentPlayers: Tournament;
  createTournamentPlayersByName: Tournament;
  createTournamentSlugs: Array<Tournament>;
  deleteCircuit: DeleteResponse;
  deleteLobby: DeleteResponse;
  deleteLobbyGroups: DeleteResponse;
  deletePlayer: Player;
  deletePlayerLink: DeleteResponse;
  deleteStage: DeleteResponse;
  deleteTournament: DeleteResponse;
  deleteTournamentResults: DeleteResponse;
  deleteTournamentStream: DeleteResponse;
  generateLobbies: CreateLobbiesResponse;
  lockTournament: Array<TournamentResult>;
  mergePlayer: Player;
  updateCircuit: Circuit;
  updateLobby: Lobby;
  updatePlayer: Player;
  updatePlayerLink: PlayerLink;
  updateStage: Stage;
  updateStagePlayer: StagePlayerInfo;
  updateTiebreakers: Stage;
  updateTournament: Tournament;
};


export type MutationAddTournamentStreamArgs = {
  isLive: Scalars['Boolean']['input'];
  isVOD: Scalars['Boolean']['input'];
  language: Scalars['String']['input'];
  link: Scalars['String']['input'];
  name: Scalars['String']['input'];
  platform: Scalars['String']['input'];
  tournamentId: Scalars['Int']['input'];
};


export type MutationCarryOverPointsFromLastStageArgs = {
  stageId: Scalars['Int']['input'];
};


export type MutationCreateCircuitArgs = {
  name: Scalars['String']['input'];
  region: Array<Scalars['String']['input']>;
  setId: Scalars['Float']['input'];
};


export type MutationCreateLobbyArgs = {
  lobbyGroupId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  sequence: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationCreateLobbyGroupArgs = {
  roundsPlayed: Scalars['Int']['input'];
  sequence: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationCreateLobbyGroupResultArgs = {
  lobbyGroupId: Scalars['Int']['input'];
  results: Array<CreateLobbyGroupResults>;
};


export type MutationCreateLobbyPlayersArgs = {
  lobbies: Array<CreatePlayerLobbyArgs>;
};


export type MutationCreateNLobbyArgs = {
  lobbyGroupId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationCreateNLobbyGroupArgs = {
  quantity: Scalars['Int']['input'];
  roundsPlayed: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationCreatePlayerArgs = {
  alias?: InputMaybe<Array<Scalars['String']['input']>>;
  country: Scalars['String']['input'];
  name: Scalars['String']['input'];
  region: Scalars['String']['input'];
};


export type MutationCreatePlayerLinkArgs = {
  link: Scalars['String']['input'];
  playerId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


export type MutationCreateRoundArgs = {
  sequence: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationCreateStageArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  pointSchemaId: Scalars['Int']['input'];
  qualifiedCount: Scalars['Int']['input'];
  roundCount: Scalars['Int']['input'];
  sequence: Scalars['Int']['input'];
  stageType: StageType;
  startDateTime?: InputMaybe<Scalars['String']['input']>;
  tiebreakers?: InputMaybe<Array<Scalars['Int']['input']>>;
  tournamentId: Scalars['Int']['input'];
};


export type MutationCreateStagePlayersArgs = {
  playerIds: Array<Scalars['Int']['input']>;
  stageId: Scalars['Int']['input'];
};


export type MutationCreateStagePlayersByNameArgs = {
  playerNames: Scalars['String']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationCreateTournamentArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  host?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  participantsNumber?: InputMaybe<Scalars['Int']['input']>;
  prizePool?: InputMaybe<Scalars['Float']['input']>;
  region?: InputMaybe<Array<Scalars['String']['input']>>;
  setId: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type MutationCreateTournamentPlayersArgs = {
  playerIds: Array<Scalars['Int']['input']>;
  tournamentId: Scalars['Int']['input'];
};


export type MutationCreateTournamentPlayersByNameArgs = {
  playerNames: Scalars['String']['input'];
  tournamentId: Scalars['Int']['input'];
};


export type MutationDeleteCircuitArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteLobbyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteLobbyGroupsArgs = {
  stageId: Scalars['Int']['input'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePlayerLinkArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTournamentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTournamentResultsArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTournamentStreamArgs = {
  name: Scalars['String']['input'];
  tournamentId: Scalars['Int']['input'];
};


export type MutationGenerateLobbiesArgs = {
  roundsPerLobbyGroup: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationLockTournamentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationMergePlayerArgs = {
  playerIdToMaintain: Scalars['Int']['input'];
  playerIdToRemove: Scalars['Int']['input'];
};


export type MutationUpdateCircuitArgs = {
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Array<Scalars['String']['input']>>;
  setId?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationUpdateLobbyArgs = {
  id: Scalars['Int']['input'];
  lobbyGroupId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  sequence: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationUpdatePlayerArgs = {
  alias?: InputMaybe<Array<Scalars['String']['input']>>;
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePlayerLinkArgs = {
  id: Scalars['Int']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateStageArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  pointSchemaId: Scalars['Int']['input'];
  qualifiedCount: Scalars['Int']['input'];
  roundCount: Scalars['Int']['input'];
  sequence: Scalars['Int']['input'];
  stageType: StageType;
  startDateTime?: InputMaybe<Scalars['String']['input']>;
  tiebreakers?: InputMaybe<Array<Scalars['Int']['input']>>;
  tournamentId: Scalars['Int']['input'];
};


export type MutationUpdateStagePlayerArgs = {
  extraPoints?: InputMaybe<Scalars['Int']['input']>;
  playerId: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
  tiebreakerRanking?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateTiebreakersArgs = {
  id: Scalars['Int']['input'];
  tiebreakers: Array<Scalars['Int']['input']>;
};


export type MutationUpdateTournamentArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  host?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  participantsNumber?: InputMaybe<Scalars['Int']['input']>;
  prizePool?: InputMaybe<Scalars['Float']['input']>;
  region?: InputMaybe<Array<Scalars['String']['input']>>;
  setId?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  visibility?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Player = {
  alias: Array<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  links: Array<PlayerLink>;
  name: Scalars['String']['output'];
  playerStats?: Maybe<PlayerCalculatedStats>;
  region?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};


export type PlayerPlayerStatsArgs = {
  setId?: InputMaybe<Scalars['Int']['input']>;
  tournamentId?: InputMaybe<Scalars['Int']['input']>;
};

export type PlayerCalculatedStats = {
  averagePosition: Scalars['Float']['output'];
  eigthCount: Scalars['Float']['output'];
  topFourCount: Scalars['Float']['output'];
  topOneCount: Scalars['Float']['output'];
  totalGames: Scalars['Int']['output'];
};

export type PlayerFilterMeta = {
  possibleCountries: Array<Scalars['String']['output']>;
  possibleRegions: Array<Scalars['String']['output']>;
};

export type PlayerLink = {
  id: Scalars['Int']['output'];
  link: Scalars['String']['output'];
  playerId: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type PlayerResults = {
  lobbyPlayerId: Scalars['Int']['output'];
  player: Player;
  points: Array<Scalars['Int']['output']>;
  positions: Array<Scalars['Int']['output']>;
};

export type PlayerWithStats = {
  averagePosition: Scalars['Float']['output'];
  eigthCount: Scalars['Float']['output'];
  player: Player;
  topFourCount: Scalars['Float']['output'];
  topOneCount: Scalars['Float']['output'];
  totalGames: Scalars['Int']['output'];
};

export type PointSchema = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  adminPlayers: Array<Player>;
  adminTournaments: Array<Tournament>;
  circuit?: Maybe<Circuit>;
  circuits: Array<Circuit>;
  lobbies: Array<Lobby>;
  lobbyResultsByStage: Array<LobbyGroupWithLobbies>;
  ongoingTournaments: Array<Tournament>;
  pastTournaments: Array<Tournament>;
  player: Player;
  playerBySlug: Player;
  playerFilterMeta: PlayerFilterMeta;
  playerLink: PlayerLink;
  playerStats: Array<PlayerWithStats>;
  players: Array<Player>;
  playersFromPreviousStage: Array<StagePlayerInfo>;
  pointSchema?: Maybe<PointSchema>;
  pointSchemas: Array<PointSchema>;
  resultsByLobbyGroup: Array<PlayerResults>;
  resultsByStage: Array<PlayerResults>;
  resultsOfTournament: Array<TournamentResult>;
  set?: Maybe<Set>;
  sets: Array<Set>;
  stage: Stage;
  stagePlayer: StagePlayerInfo;
  stages: Array<Stage>;
  streamsOfTournament: Array<TournamentStream>;
  tiebreakers: Array<Tiebreaker>;
  tournament: Tournament;
  tournamentBySlug: Tournament;
  tournaments: Array<Tournament>;
  tournamentsByMonth: Array<Tournament>;
  tournamentsPlayed: Array<TournamentsPlayed>;
  tournamentsWithStats: Array<Tournament>;
  upcomingTournaments: Array<Tournament>;
};


export type QueryAdminPlayersArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdminTournamentsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Array<Scalars['String']['input']>>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  setId?: InputMaybe<Array<Scalars['Int']['input']>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCircuitArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLobbiesArgs = {
  lobbyGroupId: Scalars['Int']['input'];
};


export type QueryLobbyResultsByStageArgs = {
  stageId: Scalars['Int']['input'];
};


export type QueryPastTournamentsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Array<Scalars['String']['input']>>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  setId?: InputMaybe<Array<Scalars['Int']['input']>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPlayerArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPlayerBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPlayerLinkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPlayerStatsArgs = {
  minimumGames?: InputMaybe<Scalars['Int']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  setId?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortOption>;
  take?: InputMaybe<Scalars['Int']['input']>;
  tournamentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type QueryPlayersArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPlayersFromPreviousStageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPointSchemaArgs = {
  id: Scalars['Int']['input'];
};


export type QueryResultsByLobbyGroupArgs = {
  lobbyGroupId: Scalars['Int']['input'];
};


export type QueryResultsByStageArgs = {
  stageId: Scalars['Int']['input'];
};


export type QueryResultsOfTournamentArgs = {
  tournamentId: Scalars['Int']['input'];
};


export type QuerySetArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStagePlayerArgs = {
  playerId: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
};


export type QueryStagesArgs = {
  tournamentId: Scalars['Int']['input'];
};


export type QueryStreamsOfTournamentArgs = {
  tournamentId: Scalars['Int']['input'];
};


export type QueryTournamentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTournamentBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryTournamentsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Array<Scalars['String']['input']>>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  setId?: InputMaybe<Array<Scalars['Int']['input']>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTournamentsByMonthArgs = {
  month: Scalars['Int']['input'];
  region?: InputMaybe<Array<Scalars['String']['input']>>;
  year: Scalars['Int']['input'];
};


export type QueryTournamentsPlayedArgs = {
  playerId: Scalars['Int']['input'];
};


export type QueryTournamentsWithStatsArgs = {
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUpcomingTournamentsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Array<Scalars['String']['input']>>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  setId?: InputMaybe<Array<Scalars['Int']['input']>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Round = {
  id: Scalars['Int']['output'];
  sequence: Scalars['Int']['output'];
  stageId: Scalars['Int']['output'];
};

export type RoundResult = {
  lobbyPlayerId: Scalars['Int']['output'];
  position: Scalars['Int']['output'];
  roundId: Scalars['Int']['output'];
};

export type Set = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type SortOption = {
  asc: Scalars['Boolean']['input'];
  column: Scalars['String']['input'];
};

export type Stage = {
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lobbies?: Maybe<Array<Lobby>>;
  lobbyGroups: Array<LobbyGroup>;
  name: Scalars['String']['output'];
  players: Array<StagePlayerInfo>;
  pointSchema: PointSchema;
  pointSchemaId: Scalars['Int']['output'];
  qualifiedCount: Scalars['Int']['output'];
  roundCount: Scalars['Int']['output'];
  rounds?: Maybe<Array<Round>>;
  sequence: Scalars['Int']['output'];
  stageType: StageType;
  startDateTime?: Maybe<Scalars['String']['output']>;
  tiebreakers: Array<Scalars['Int']['output']>;
  tournamentId: Scalars['Int']['output'];
};

export type StagePlayerInfo = {
  extraPoints: Scalars['Int']['output'];
  player: Player;
  playerId: Scalars['Int']['output'];
  stageId: Scalars['Int']['output'];
  tiebreakerRanking: Scalars['Int']['output'];
};

export enum StageType {
  GroupBased = 'GROUP_BASED',
  Ranking = 'RANKING'
}

export type SuccessResponse = {
  success: Scalars['Boolean']['output'];
};

export type Tiebreaker = {
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
};

export type Tournament = {
  currency?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  host?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nextStartTime?: Maybe<Scalars['Int']['output']>;
  participantsNumber?: Maybe<Scalars['Int']['output']>;
  players?: Maybe<Array<Player>>;
  prizePool?: Maybe<Scalars['Float']['output']>;
  region?: Maybe<Array<Scalars['String']['output']>>;
  set: Set;
  setId: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  stages?: Maybe<Array<Stage>>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  visibility: Scalars['Boolean']['output'];
};

export type TournamentResult = {
  circuitId: Scalars['Int']['output'];
  circuitPointsEarned: Scalars['Int']['output'];
  currency: Scalars['String']['output'];
  finalPosition: Scalars['String']['output'];
  otherRewards: Scalars['String']['output'];
  playerId: Scalars['Int']['output'];
  prize: Scalars['Float']['output'];
  prizeInUSD: Scalars['Float']['output'];
  qualifyTo: Array<Scalars['Int']['output']>;
  tournamentId: Scalars['Int']['output'];
};

export type TournamentStream = {
  isLive: Scalars['Boolean']['output'];
  isVOD: Scalars['Boolean']['output'];
  language: Scalars['String']['output'];
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
  platform: Scalars['String']['output'];
  tournamentId: Scalars['Int']['output'];
};

export type TournamentsPlayed = {
  currency?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  finalPosition?: Maybe<Scalars['String']['output']>;
  host?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nextStartTime?: Maybe<Scalars['Int']['output']>;
  participantsNumber?: Maybe<Scalars['Int']['output']>;
  players?: Maybe<Array<Player>>;
  prizePool?: Maybe<Scalars['Float']['output']>;
  region?: Maybe<Array<Scalars['String']['output']>>;
  set: Set;
  setId: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  stages?: Maybe<Array<Stage>>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  visibility: Scalars['Boolean']['output'];
};

export type SetsQueryVariables = Exact<{ [key: string]: never; }>;


export type SetsQuery = { sets: Array<{ id: number, name: string }> };

export type ListPointSchemasQueryVariables = Exact<{ [key: string]: never; }>;


export type ListPointSchemasQuery = { pointSchemas: Array<{ id: number, name: string }> };

export type AdminPlayerLinksQueryVariables = Exact<{
  playerId: Scalars['Int']['input'];
}>;


export type AdminPlayerLinksQuery = { player: { id: number, links: Array<{ id: number, type: string, link: string }> } };

export type CreatePlayerLinkMutationVariables = Exact<{
  playerId: Scalars['Int']['input'];
  link: Scalars['String']['input'];
  type: Scalars['String']['input'];
}>;


export type CreatePlayerLinkMutation = { createPlayerLink: { id: number } };

export type DeletePlayerLinkMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePlayerLinkMutation = { deletePlayerLink: { id: number } };

export type AdminPlayerQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminPlayerQuery = { player: { id: number, name: string, country?: string | null, region?: string | null, slug: string, alias: Array<string> } };

export type ListAdminPlayersQueryVariables = Exact<{
  searchQuery?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListAdminPlayersQuery = { adminPlayers: Array<{ id: number, name: string, region?: string | null, country?: string | null, alias: Array<string> }> };

export type DeletePlayerMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePlayerMutation = { deletePlayer: { id: number } };

export type UpdatePlayerMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  alias?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type UpdatePlayerMutation = { updatePlayer: { id: number } };

export type MergePlayerMutationVariables = Exact<{
  playerIdToMaintain: Scalars['Int']['input'];
  playerIdToRemove: Scalars['Int']['input'];
}>;


export type MergePlayerMutation = { mergePlayer: { id: number } };

export type CreateLobbyPlayersMutationVariables = Exact<{
  lobbies: Array<CreatePlayerLobbyArgs> | CreatePlayerLobbyArgs;
}>;


export type CreateLobbyPlayersMutation = { createLobbyPlayers: Array<{ id: number }> };

export type CreateLobbyGroupMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
  sequence: Scalars['Int']['input'];
  roundsPlayed: Scalars['Int']['input'];
}>;


export type CreateLobbyGroupMutation = { createLobbyGroup: { id: number } };

export type CreateNLobbyGroupMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  roundsPlayed: Scalars['Int']['input'];
}>;


export type CreateNLobbyGroupMutation = { createNLobbyGroup: Array<{ id: number }> };

export type CreateNLobbyMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  lobbyGroupId: Scalars['Int']['input'];
}>;


export type CreateNLobbyMutation = { createNLobby: Array<{ id: number }> };

export type CreateLobbyMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
  sequence: Scalars['Int']['input'];
  lobbyGroupId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateLobbyMutation = { createLobby: { id: number } };

export type DeleteLobbyGroupsMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
}>;


export type DeleteLobbyGroupsMutation = { deleteLobbyGroups: { id: number } };

export type OneTournamentWithPlayersQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OneTournamentWithPlayersQuery = { tournament: { id: number, players?: Array<{ id: number, name: string, region?: string | null }> | null } };

export type OneStageWithPlayersQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OneStageWithPlayersQuery = { stage: { id: number, players: Array<{ player: { id: number, name: string, region?: string | null } }> } };

export type OneStageWithLobbyGroupsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OneStageWithLobbyGroupsQuery = { stage: { id: number, lobbyGroups: Array<{ id: number, sequence: number }> } };

export type GenerateLobbiesMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
  roundsPerLobbyGroup: Scalars['Int']['input'];
}>;


export type GenerateLobbiesMutation = { generateLobbies: { createdLobbyGroups: number, createdLobbies: number } };

export type ListLobbiesWithPlayersQueryVariables = Exact<{
  lobbyGroupId: Scalars['Int']['input'];
}>;


export type ListLobbiesWithPlayersQuery = { lobbies: Array<{ id: number, name: string, players: Array<{ id: number, name: string, region?: string | null, country?: string | null }> }> };

export type OneStageIwthPlayersQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OneStageIwthPlayersQuery = { stage: { id: number, players: Array<{ player: { id: number, name: string, region?: string | null } }> } };

export type CreateStagePlayersMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
  playerIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type CreateStagePlayersMutation = { createStagePlayers: { id: number } };

export type CreateStagePlayersByNameMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
  playerNames: Scalars['String']['input'];
}>;


export type CreateStagePlayersByNameMutation = { createStagePlayersByName: { id: number } };

export type OneStagePlayerQueryVariables = Exact<{
  stageId: Scalars['Int']['input'];
  playerId: Scalars['Int']['input'];
}>;


export type OneStagePlayerQuery = { stagePlayer: { stageId: number, playerId: number, extraPoints: number, tiebreakerRanking: number } };

export type UpdateStagePlayerMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
  playerId: Scalars['Int']['input'];
  extraPoints?: InputMaybe<Scalars['Int']['input']>;
  tiebreakerRanking?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateStagePlayerMutation = { updateStagePlayer: { stageId: number, playerId: number, extraPoints: number, tiebreakerRanking: number } };

export type ResultsQueryVariables = Exact<{
  lobbyGroupId: Scalars['Int']['input'];
}>;


export type ResultsQuery = { resultsByLobbyGroup: Array<{ positions: Array<number>, lobbyPlayerId: number, player: { id: number, name: string } }> };

export type CreateResultsMutationVariables = Exact<{
  lobbyGroupId: Scalars['Int']['input'];
  results: Array<CreateLobbyGroupResults> | CreateLobbyGroupResults;
}>;


export type CreateResultsMutation = { createLobbyGroupResult: Array<{ roundId: number }> };

export type OneStageWithLobbyGroupsAndRoundsPlayedQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OneStageWithLobbyGroupsAndRoundsPlayedQuery = { stage: { id: number, lobbyGroups: Array<{ id: number, sequence: number, roundsPlayed: number }> } };

export type ListLobbiesWithPlayersByLobbyGroupQueryVariables = Exact<{
  lobbyGroupId: Scalars['Int']['input'];
}>;


export type ListLobbiesWithPlayersByLobbyGroupQuery = { lobbies: Array<{ id: number, name: string, players: Array<{ id: number, name: string, region?: string | null, country?: string | null }> }> };

export type TiebreakersQueryVariables = Exact<{ [key: string]: never; }>;


export type TiebreakersQuery = { tiebreakers: Array<{ id: number, description: string }> };

export type OneStageTiebreakersQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OneStageTiebreakersQuery = { stage: { id: number, tiebreakers: Array<number> } };

export type UpdateTiebreakersMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  tiebreakers: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type UpdateTiebreakersMutation = { updateTiebreakers: { id: number } };

export type CarryOverPointsFromLastStageMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
}>;


export type CarryOverPointsFromLastStageMutation = { carryOverPointsFromLastStage: { success: boolean } };

export type OneStageQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OneStageQuery = { stage: { id: number, name: string, description: string, sequence: number, pointSchemaId: number, roundCount: number, qualifiedCount: number, stageType: StageType, startDateTime?: string | null } };

export type OneTournamentWithSetQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OneTournamentWithSetQuery = { tournament: { id: number, name: string, set: { id: number, name: string } } };

export type PlayersPaginatedQueryVariables = Exact<{
  region?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
}>;


export type PlayersPaginatedQuery = { players: Array<{ id: number, name: string, country?: string | null, region?: string | null }> };

export type CreateTournamentPlayersMutationVariables = Exact<{
  tournamentId: Scalars['Int']['input'];
  playerIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type CreateTournamentPlayersMutation = { createTournamentPlayers: { id: number } };

export type CreateTournamentPlayersByNameMutationVariables = Exact<{
  tournamentId: Scalars['Int']['input'];
  playerNames: Scalars['String']['input'];
}>;


export type CreateTournamentPlayersByNameMutation = { createTournamentPlayersByName: { id: number } };

export type CreatePlayerMutationVariables = Exact<{
  name: Scalars['String']['input'];
  country: Scalars['String']['input'];
  region: Scalars['String']['input'];
  alias?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreatePlayerMutation = { createPlayer: { id: number } };

export type DeleteStageMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteStageMutation = { deleteStage: { id: number } };

export type UpdateStageMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  tournamentId: Scalars['Int']['input'];
  pointSchemaId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  sequence: Scalars['Int']['input'];
  roundCount: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  qualifiedCount: Scalars['Int']['input'];
  stageType: StageType;
  startDateTime?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateStageMutation = { updateStage: { id: number } };

export type OneTournamentWithStagesAndPointSchemaQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OneTournamentWithStagesAndPointSchemaQuery = { tournament: { id: number, stages?: Array<{ id: number, name: string, description: string, sequence: number, roundCount: number, pointSchemaId: number, pointSchema: { id: number, name: string } }> | null } };

export type CreateStageMutationVariables = Exact<{
  tournamentId: Scalars['Int']['input'];
  pointSchemaId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  sequence: Scalars['Int']['input'];
  roundCount: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  qualifiedCount: Scalars['Int']['input'];
  stageType: StageType;
  startDateTime?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateStageMutation = { createStage: { id: number } };

export type StreamsQueryVariables = Exact<{
  tournamentId: Scalars['Int']['input'];
}>;


export type StreamsQuery = { streamsOfTournament: Array<{ tournamentId: number, name: string, link: string, platform: string, language: string, isLive: boolean, isVOD: boolean }> };

export type AddTournamentStreamMutationVariables = Exact<{
  tournamentId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  link: Scalars['String']['input'];
  platform: Scalars['String']['input'];
  language: Scalars['String']['input'];
  isLive: Scalars['Boolean']['input'];
  isVOD: Scalars['Boolean']['input'];
}>;


export type AddTournamentStreamMutation = { addTournamentStream: { tournamentId: number, name: string } };

export type DeleteTournamentStreamMutationVariables = Exact<{
  tournamentId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
}>;


export type DeleteTournamentStreamMutation = { deleteTournamentStream: { id: number } };

export type DeleteTournamentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTournamentMutation = { deleteTournament: { id: number } };

export type UpdateTournamentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  setId?: InputMaybe<Scalars['Int']['input']>;
  region?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  host?: InputMaybe<Scalars['String']['input']>;
  participantsNumber?: InputMaybe<Scalars['Int']['input']>;
  prizePool?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  visibility?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateTournamentMutation = { updateTournament: { id: number } };

export type LockTournamentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type LockTournamentMutation = { lockTournament: Array<{ tournamentId: number }> };

export type DeleteTournamentResultsMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTournamentResultsMutation = { deleteTournamentResults: { id: number } };

export type OneTournamentFullQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OneTournamentFullQuery = { tournament: { id: number, name: string, region?: Array<string> | null, host?: string | null, participantsNumber?: number | null, prizePool?: number | null, currency?: string | null, startDate?: any | null, endDate?: any | null, setId: number, visibility: boolean, set: { id: number, name: string } } };

export type ListAdminTournamentsPaginatedQueryVariables = Exact<{
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ListAdminTournamentsPaginatedQuery = { adminTournaments: Array<{ id: number, name: string, participantsNumber?: number | null, prizePool?: number | null, currency?: string | null, region?: Array<string> | null, startDate?: any | null, endDate?: any | null, set: { id: number, name: string } }> };

export type CreateTournamentMutationVariables = Exact<{
  name: Scalars['String']['input'];
  region?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  host?: InputMaybe<Scalars['String']['input']>;
  participantsNumber?: InputMaybe<Scalars['Int']['input']>;
  prizePool?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  setId: Scalars['Int']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateTournamentMutation = { createTournament: { id: number } };

export type CreatePlayerSlugsMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatePlayerSlugsMutation = { createPlayerSlugs: Array<{ id: number, name: string, slug: string }> };

export type CreateTournamentSlugsMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateTournamentSlugsMutation = { createTournamentSlugs: Array<{ id: number, name: string, slug: string }> };

export type TournamentsByDateQueryVariables = Exact<{
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  region?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type TournamentsByDateQuery = { tournaments: Array<{ id: number, name: string, participantsNumber?: number | null, prizePool?: number | null, currency?: string | null, region?: Array<string> | null, startDate?: any | null, endDate?: any | null, set: { id: number, name: string } }> };

export type PlayerLinksQueryVariables = Exact<{
  playerId: Scalars['Int']['input'];
}>;


export type PlayerLinksQuery = { player: { id: number, links: Array<{ id: number, type: string, link: string }> } };

export type ListTournamentsPlayedByPlayerQueryVariables = Exact<{
  playerId: Scalars['Int']['input'];
}>;


export type ListTournamentsPlayedByPlayerQuery = { tournamentsPlayed: Array<{ id: number, name: string, region?: Array<string> | null, slug: string, participantsNumber?: number | null, prizePool?: number | null, currency?: string | null, startDate?: any | null, endDate?: any | null, finalPosition?: string | null, set: { id: number, name: string } }> };

export type OnePlayerBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type OnePlayerBySlugQuery = { playerBySlug: { id: number, name: string, region?: string | null, country?: string | null, alias: Array<string> } };

export type OnePlayerWithStatsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  setId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OnePlayerWithStatsQuery = { player: { id: number, playerStats?: { averagePosition: number, totalGames: number, topFourCount: number, topOneCount: number } | null } };

export type PlayersQueryVariables = Exact<{
  region?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PlayersQuery = { players: Array<{ id: number, name: string, country?: string | null, region?: string | null, slug: string, alias: Array<string> }> };

export type ListTournamentsWithStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListTournamentsWithStatsQuery = { tournamentsWithStats: Array<{ id: number, name: string, set: { id: number, name: string } }> };

export type ListTournamentsWithStatsAndFilterQueryVariables = Exact<{
  searchQuery?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListTournamentsWithStatsAndFilterQuery = { tournamentsWithStats: Array<{ id: number, name: string, set: { id: number, name: string } }> };

export type ListSetsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListSetsQuery = { sets: Array<{ id: number, name: string }> };

export type StatsQueryVariables = Exact<{
  setId?: InputMaybe<Scalars['Int']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  tournamentIds?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  sort?: InputMaybe<SortOption>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  minimumGames?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StatsQuery = { playerStats: Array<{ averagePosition: number, topFourCount: number, topOneCount: number, eigthCount: number, totalGames: number, player: { id: number, name: string, country?: string | null, slug: string } }> };

export type TournamentQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type TournamentQuery = { tournamentBySlug: { id: number, name: string, region?: Array<string> | null, host?: string | null, participantsNumber?: number | null, prizePool?: number | null, currency?: string | null, startDate?: any | null, endDate?: any | null, setId: number, set: { id: number, name: string }, stages?: Array<{ id: number, name: string, sequence: number, description: string, roundCount: number, stageType: StageType, qualifiedCount: number }> | null } };

export type ListResultsByStageQueryVariables = Exact<{
  stageId: Scalars['Int']['input'];
}>;


export type ListResultsByStageQuery = { resultsByStage: Array<{ positions: Array<number>, points: Array<number>, player: { id: number, name: string, country?: string | null, slug: string } }> };

export type ListLobbyResultsByStageQueryVariables = Exact<{
  stageId: Scalars['Int']['input'];
}>;


export type ListLobbyResultsByStageQuery = { lobbyResultsByStage: Array<{ id: number, roundsPlayed: number, lobbies: Array<{ id: number, name: string, results: Array<{ positions: Array<number>, points: Array<number>, player: { id: number, name: string, country?: string | null, slug: string } }> }> }> };

export type ListUpcomingTournamentsQueryVariables = Exact<{
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  setId?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  region?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ListUpcomingTournamentsQuery = { upcomingTournaments: Array<{ id: number, name: string, participantsNumber?: number | null, prizePool?: number | null, currency?: string | null, region?: Array<string> | null, startDate?: any | null, endDate?: any | null, slug: string, set: { id: number, name: string } }> };

export type ListOngoingTournamentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListOngoingTournamentsQuery = { ongoingTournaments: Array<{ id: number, name: string, participantsNumber?: number | null, prizePool?: number | null, currency?: string | null, region?: Array<string> | null, startDate?: any | null, endDate?: any | null, slug: string, nextStartTime?: number | null, set: { id: number, name: string } }> };

export type ListPastTournamentsQueryVariables = Exact<{
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  setId?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  region?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ListPastTournamentsQuery = { pastTournaments: Array<{ id: number, name: string, participantsNumber?: number | null, prizePool?: number | null, currency?: string | null, region?: Array<string> | null, startDate?: any | null, endDate?: any | null, slug: string, set: { id: number, name: string } }> };


export const SetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SetsQuery, SetsQueryVariables>;
export const ListPointSchemasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listPointSchemas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pointSchemas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ListPointSchemasQuery, ListPointSchemasQueryVariables>;
export const AdminPlayerLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"adminPlayerLinks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<AdminPlayerLinksQuery, AdminPlayerLinksQueryVariables>;
export const CreatePlayerLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPlayerLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"link"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlayerLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"link"},"value":{"kind":"Variable","name":{"kind":"Name","value":"link"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePlayerLinkMutation, CreatePlayerLinkMutationVariables>;
export const DeletePlayerLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePlayerLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlayerLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePlayerLinkMutation, DeletePlayerLinkMutationVariables>;
export const AdminPlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"adminPlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}}]}}]} as unknown as DocumentNode<AdminPlayerQuery, AdminPlayerQueryVariables>;
export const ListAdminPlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listAdminPlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminPlayers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}}]}}]} as unknown as DocumentNode<ListAdminPlayersQuery, ListAdminPlayersQueryVariables>;
export const DeletePlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlayer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePlayerMutation, DeletePlayerMutationVariables>;
export const UpdatePlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"alias"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlayer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"alias"},"value":{"kind":"Variable","name":{"kind":"Name","value":"alias"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePlayerMutation, UpdatePlayerMutationVariables>;
export const MergePlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"mergePlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerIdToMaintain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerIdToRemove"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mergePlayer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerIdToMaintain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerIdToMaintain"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerIdToRemove"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerIdToRemove"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MergePlayerMutation, MergePlayerMutationVariables>;
export const CreateLobbyPlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createLobbyPlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lobbies"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlayerLobbyArgs"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLobbyPlayers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lobbies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lobbies"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateLobbyPlayersMutation, CreateLobbyPlayersMutationVariables>;
export const CreateLobbyGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createLobbyGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sequence"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundsPlayed"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLobbyGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sequence"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sequence"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundsPlayed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundsPlayed"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateLobbyGroupMutation, CreateLobbyGroupMutationVariables>;
export const CreateNLobbyGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createNLobbyGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundsPlayed"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNLobbyGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundsPlayed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundsPlayed"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateNLobbyGroupMutation, CreateNLobbyGroupMutationVariables>;
export const CreateNLobbyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createNLobby"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNLobby"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"lobbyGroupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateNLobbyMutation, CreateNLobbyMutationVariables>;
export const CreateLobbyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createLobby"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sequence"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLobby"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sequence"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sequence"}}},{"kind":"Argument","name":{"kind":"Name","value":"lobbyGroupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateLobbyMutation, CreateLobbyMutationVariables>;
export const DeleteLobbyGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteLobbyGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLobbyGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteLobbyGroupsMutation, DeleteLobbyGroupsMutationVariables>;
export const OneTournamentWithPlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneTournamentWithPlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}}]}}]}}]}}]} as unknown as DocumentNode<OneTournamentWithPlayersQuery, OneTournamentWithPlayersQueryVariables>;
export const OneStageWithPlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneStageWithPlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OneStageWithPlayersQuery, OneStageWithPlayersQueryVariables>;
export const OneStageWithLobbyGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneStageWithLobbyGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lobbyGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}}]}}]}}]}}]} as unknown as DocumentNode<OneStageWithLobbyGroupsQuery, OneStageWithLobbyGroupsQueryVariables>;
export const GenerateLobbiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"generateLobbies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundsPerLobbyGroup"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateLobbies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundsPerLobbyGroup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundsPerLobbyGroup"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdLobbyGroups"}},{"kind":"Field","name":{"kind":"Name","value":"createdLobbies"}}]}}]}}]} as unknown as DocumentNode<GenerateLobbiesMutation, GenerateLobbiesMutationVariables>;
export const ListLobbiesWithPlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listLobbiesWithPlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lobbies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lobbyGroupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]} as unknown as DocumentNode<ListLobbiesWithPlayersQuery, ListLobbiesWithPlayersQueryVariables>;
export const OneStageIwthPlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneStageIwthPlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OneStageIwthPlayersQuery, OneStageIwthPlayersQueryVariables>;
export const CreateStagePlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStagePlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStagePlayers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateStagePlayersMutation, CreateStagePlayersMutationVariables>;
export const CreateStagePlayersByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStagePlayersByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerNames"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStagePlayersByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerNames"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerNames"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateStagePlayersByNameMutation, CreateStagePlayersByNameMutationVariables>;
export const OneStagePlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneStagePlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stagePlayer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stageId"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"extraPoints"}},{"kind":"Field","name":{"kind":"Name","value":"tiebreakerRanking"}}]}}]}}]} as unknown as DocumentNode<OneStagePlayerQuery, OneStagePlayerQueryVariables>;
export const UpdateStagePlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStagePlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"extraPoints"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tiebreakerRanking"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStagePlayer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"extraPoints"},"value":{"kind":"Variable","name":{"kind":"Name","value":"extraPoints"}}},{"kind":"Argument","name":{"kind":"Name","value":"tiebreakerRanking"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tiebreakerRanking"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stageId"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"extraPoints"}},{"kind":"Field","name":{"kind":"Name","value":"tiebreakerRanking"}}]}}]}}]} as unknown as DocumentNode<UpdateStagePlayerMutation, UpdateStagePlayerMutationVariables>;
export const ResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"results"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resultsByLobbyGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lobbyGroupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"}},{"kind":"Field","name":{"kind":"Name","value":"lobbyPlayerId"}}]}}]}}]} as unknown as DocumentNode<ResultsQuery, ResultsQueryVariables>;
export const CreateResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"results"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLobbyGroupResults"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLobbyGroupResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lobbyGroupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"results"},"value":{"kind":"Variable","name":{"kind":"Name","value":"results"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roundId"}}]}}]}}]} as unknown as DocumentNode<CreateResultsMutation, CreateResultsMutationVariables>;
export const OneStageWithLobbyGroupsAndRoundsPlayedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneStageWithLobbyGroupsAndRoundsPlayed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lobbyGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"roundsPlayed"}}]}}]}}]}}]} as unknown as DocumentNode<OneStageWithLobbyGroupsAndRoundsPlayedQuery, OneStageWithLobbyGroupsAndRoundsPlayedQueryVariables>;
export const ListLobbiesWithPlayersByLobbyGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listLobbiesWithPlayersByLobbyGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lobbies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lobbyGroupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lobbyGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]} as unknown as DocumentNode<ListLobbiesWithPlayersByLobbyGroupQuery, ListLobbiesWithPlayersByLobbyGroupQueryVariables>;
export const TiebreakersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tiebreakers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tiebreakers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<TiebreakersQuery, TiebreakersQueryVariables>;
export const OneStageTiebreakersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneStageTiebreakers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tiebreakers"}}]}}]}}]} as unknown as DocumentNode<OneStageTiebreakersQuery, OneStageTiebreakersQueryVariables>;
export const UpdateTiebreakersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTiebreakers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tiebreakers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTiebreakers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"tiebreakers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tiebreakers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTiebreakersMutation, UpdateTiebreakersMutationVariables>;
export const CarryOverPointsFromLastStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"carryOverPointsFromLastStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carryOverPointsFromLastStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<CarryOverPointsFromLastStageMutation, CarryOverPointsFromLastStageMutationVariables>;
export const OneStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"pointSchemaId"}},{"kind":"Field","name":{"kind":"Name","value":"roundCount"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiedCount"}},{"kind":"Field","name":{"kind":"Name","value":"stageType"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}}]}}]}}]} as unknown as DocumentNode<OneStageQuery, OneStageQueryVariables>;
export const OneTournamentWithSetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneTournamentWithSet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<OneTournamentWithSetQuery, OneTournamentWithSetQueryVariables>;
export const PlayersPaginatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"playersPaginated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"players"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"region"}}]}}]}}]} as unknown as DocumentNode<PlayersPaginatedQuery, PlayersPaginatedQueryVariables>;
export const CreateTournamentPlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTournamentPlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTournamentPlayers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tournamentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTournamentPlayersMutation, CreateTournamentPlayersMutationVariables>;
export const CreateTournamentPlayersByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTournamentPlayersByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerNames"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTournamentPlayersByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tournamentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerNames"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerNames"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTournamentPlayersByNameMutation, CreateTournamentPlayersByNameMutationVariables>;
export const CreatePlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"alias"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlayer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}},{"kind":"Argument","name":{"kind":"Name","value":"alias"},"value":{"kind":"Variable","name":{"kind":"Name","value":"alias"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const DeleteStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteStageMutation, DeleteStageMutationVariables>;
export const UpdateStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointSchemaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sequence"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundCount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"qualifiedCount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StageType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDateTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"tournamentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pointSchemaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointSchemaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"sequence"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sequence"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundCount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundCount"}}},{"kind":"Argument","name":{"kind":"Name","value":"qualifiedCount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"qualifiedCount"}}},{"kind":"Argument","name":{"kind":"Name","value":"stageType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageType"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDateTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateStageMutation, UpdateStageMutationVariables>;
export const OneTournamentWithStagesAndPointSchemaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneTournamentWithStagesAndPointSchema"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"roundCount"}},{"kind":"Field","name":{"kind":"Name","value":"pointSchemaId"}},{"kind":"Field","name":{"kind":"Name","value":"pointSchema"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OneTournamentWithStagesAndPointSchemaQuery, OneTournamentWithStagesAndPointSchemaQueryVariables>;
export const CreateStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pointSchemaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sequence"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundCount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"qualifiedCount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StageType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDateTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tournamentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pointSchemaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pointSchemaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"sequence"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sequence"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundCount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundCount"}}},{"kind":"Argument","name":{"kind":"Name","value":"qualifiedCount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"qualifiedCount"}}},{"kind":"Argument","name":{"kind":"Name","value":"stageType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageType"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDateTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateStageMutation, CreateStageMutationVariables>;
export const StreamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"streams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streamsOfTournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tournamentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournamentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"isLive"}},{"kind":"Field","name":{"kind":"Name","value":"isVOD"}}]}}]}}]} as unknown as DocumentNode<StreamsQuery, StreamsQueryVariables>;
export const AddTournamentStreamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTournamentStream"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"link"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isLive"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isVOD"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTournamentStream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tournamentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"link"},"value":{"kind":"Variable","name":{"kind":"Name","value":"link"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}},{"kind":"Argument","name":{"kind":"Name","value":"isLive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isLive"}}},{"kind":"Argument","name":{"kind":"Name","value":"isVOD"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isVOD"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournamentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddTournamentStreamMutation, AddTournamentStreamMutationVariables>;
export const DeleteTournamentStreamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTournamentStream"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTournamentStream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tournamentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTournamentStreamMutation, DeleteTournamentStreamMutationVariables>;
export const DeleteTournamentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTournament"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTournamentMutation, DeleteTournamentMutationVariables>;
export const UpdateTournamentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTournament"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"host"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participantsNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prizePool"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visibility"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"setId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setId"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}},{"kind":"Argument","name":{"kind":"Name","value":"host"},"value":{"kind":"Variable","name":{"kind":"Name","value":"host"}}},{"kind":"Argument","name":{"kind":"Name","value":"participantsNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participantsNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"prizePool"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prizePool"}}},{"kind":"Argument","name":{"kind":"Name","value":"currency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"visibility"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visibility"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTournamentMutation, UpdateTournamentMutationVariables>;
export const LockTournamentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"lockTournament"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lockTournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournamentId"}}]}}]}}]} as unknown as DocumentNode<LockTournamentMutation, LockTournamentMutationVariables>;
export const DeleteTournamentResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTournamentResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTournamentResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTournamentResultsMutation, DeleteTournamentResultsMutationVariables>;
export const OneTournamentFullDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneTournamentFull"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"host"}},{"kind":"Field","name":{"kind":"Name","value":"participantsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"prizePool"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"setId"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<OneTournamentFullQuery, OneTournamentFullQueryVariables>;
export const ListAdminTournamentsPaginatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listAdminTournamentsPaginated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminTournaments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"participantsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"prizePool"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ListAdminTournamentsPaginatedQuery, ListAdminTournamentsPaginatedQueryVariables>;
export const CreateTournamentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTournament"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"host"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participantsNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prizePool"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}},{"kind":"Argument","name":{"kind":"Name","value":"host"},"value":{"kind":"Variable","name":{"kind":"Name","value":"host"}}},{"kind":"Argument","name":{"kind":"Name","value":"participantsNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participantsNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"prizePool"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prizePool"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"setId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setId"}}},{"kind":"Argument","name":{"kind":"Name","value":"currency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTournamentMutation, CreateTournamentMutationVariables>;
export const CreatePlayerSlugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPlayerSlugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlayerSlugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CreatePlayerSlugsMutation, CreatePlayerSlugsMutationVariables>;
export const CreateTournamentSlugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTournamentSlugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTournamentSlugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CreateTournamentSlugsMutation, CreateTournamentSlugsMutationVariables>;
export const TournamentsByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tournamentsByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournaments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"participantsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"prizePool"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<TournamentsByDateQuery, TournamentsByDateQueryVariables>;
export const PlayerLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"playerLinks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<PlayerLinksQuery, PlayerLinksQueryVariables>;
export const ListTournamentsPlayedByPlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listTournamentsPlayedByPlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournamentsPlayed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"participantsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"prizePool"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"finalPosition"}}]}}]}}]} as unknown as DocumentNode<ListTournamentsPlayedByPlayerQuery, ListTournamentsPlayedByPlayerQueryVariables>;
export const OnePlayerBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"onePlayerBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}}]}}]} as unknown as DocumentNode<OnePlayerBySlugQuery, OnePlayerBySlugQueryVariables>;
export const OnePlayerWithStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"onePlayerWithStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"setId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averagePosition"}},{"kind":"Field","name":{"kind":"Name","value":"totalGames"}},{"kind":"Field","name":{"kind":"Name","value":"topFourCount"}},{"kind":"Field","name":{"kind":"Name","value":"topOneCount"}}]}}]}}]}}]} as unknown as DocumentNode<OnePlayerWithStatsQuery, OnePlayerWithStatsQueryVariables>;
export const PlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"players"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"players"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}}]}}]} as unknown as DocumentNode<PlayersQuery, PlayersQueryVariables>;
export const ListTournamentsWithStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listTournamentsWithStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournamentsWithStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ListTournamentsWithStatsQuery, ListTournamentsWithStatsQueryVariables>;
export const ListTournamentsWithStatsAndFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listTournamentsWithStatsAndFilter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournamentsWithStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ListTournamentsWithStatsAndFilterQuery, ListTournamentsWithStatsAndFilterQueryVariables>;
export const ListSetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ListSetsQuery, ListSetsQueryVariables>;
export const StatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"stats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tournamentIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortOption"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minimumGames"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"setId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setId"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"tournamentIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tournamentIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}}},{"kind":"Argument","name":{"kind":"Name","value":"minimumGames"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minimumGames"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"averagePosition"}},{"kind":"Field","name":{"kind":"Name","value":"topFourCount"}},{"kind":"Field","name":{"kind":"Name","value":"topOneCount"}},{"kind":"Field","name":{"kind":"Name","value":"eigthCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalGames"}}]}}]}}]} as unknown as DocumentNode<StatsQuery, StatsQueryVariables>;
export const TournamentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tournament"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournamentBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"host"}},{"kind":"Field","name":{"kind":"Name","value":"participantsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"prizePool"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"setId"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roundCount"}},{"kind":"Field","name":{"kind":"Name","value":"stageType"}},{"kind":"Field","name":{"kind":"Name","value":"qualifiedCount"}}]}}]}}]}}]} as unknown as DocumentNode<TournamentQuery, TournamentQueryVariables>;
export const ListResultsByStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listResultsByStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resultsByStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]} as unknown as DocumentNode<ListResultsByStageQuery, ListResultsByStageQueryVariables>;
export const ListLobbyResultsByStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listLobbyResultsByStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lobbyResultsByStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roundsPlayed"}},{"kind":"Field","name":{"kind":"Name","value":"lobbies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListLobbyResultsByStageQuery, ListLobbyResultsByStageQueryVariables>;
export const ListUpcomingTournamentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listUpcomingTournaments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setId"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upcomingTournaments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}}},{"kind":"Argument","name":{"kind":"Name","value":"setId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setId"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"participantsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"prizePool"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ListUpcomingTournamentsQuery, ListUpcomingTournamentsQueryVariables>;
export const ListOngoingTournamentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listOngoingTournaments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ongoingTournaments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"participantsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"prizePool"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextStartTime"}}]}}]}}]} as unknown as DocumentNode<ListOngoingTournamentsQuery, ListOngoingTournamentsQueryVariables>;
export const ListPastTournamentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listPastTournaments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setId"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pastTournaments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}}},{"kind":"Argument","name":{"kind":"Name","value":"setId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setId"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"participantsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"prizePool"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ListPastTournamentsQuery, ListPastTournamentsQueryVariables>;