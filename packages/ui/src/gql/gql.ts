/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query sets {\n    sets {\n      id\n      name\n    }\n  }\n": types.SetsDocument,
    "\n  query listPointSchemas {\n    pointSchemas {\n      id\n      name\n    }\n  }\n": types.ListPointSchemasDocument,
    "\n  query adminPlayerLinks($id: Int!) {\n    player(id: $id) {\n      id\n      links {\n        id\n        type\n        link\n      }\n    }\n  }\n": types.AdminPlayerLinksDocument,
    "\n  mutation createPlayerLink($playerId: Int!, $link: String!, $type: String!) {\n    createPlayerLink(playerId: $playerId, link: $link, type: $type) {\n      id\n    }\n  }\n": types.CreatePlayerLinkDocument,
    "\n  mutation deletePlayerLink($id: Int!) {\n    deletePlayerLink(id: $id) {\n      id\n    }\n  }\n": types.DeletePlayerLinkDocument,
    "\n  query adminPlayer($id: Int!) {\n    player(id: $id) {\n      id\n      name\n      country\n      region\n      slug\n      alias\n    }\n  }\n": types.AdminPlayerDocument,
    "\n  query listAdminPlayers($searchQuery: String) {\n    adminPlayers(searchQuery: $searchQuery, take: 20) {\n      id\n      name\n      region\n      country\n      alias\n    }\n  }\n": types.ListAdminPlayersDocument,
    "\n  mutation deletePlayer($id: Int!) {\n    deletePlayer(id: $id) {\n      id\n    }\n  }\n": types.DeletePlayerDocument,
    "\n  mutation updatePlayer(\n    $id: Int!\n    $name: String\n    $country: String\n    $region: String\n    $slug: String\n    $alias: [String!]\n  ) {\n    updatePlayer(\n      id: $id\n      name: $name\n      country: $country\n      region: $region\n      slug: $slug\n      alias: $alias\n    ) {\n      id\n    }\n  }\n": types.UpdatePlayerDocument,
    "\n  mutation mergePlayer($playerIdToMaintain: Int!, $playerIdToRemove: Int!) {\n    mergePlayer(\n      playerIdToMaintain: $playerIdToMaintain\n      playerIdToRemove: $playerIdToRemove\n    ) {\n      id\n    }\n  }\n": types.MergePlayerDocument,
    "\n  mutation createLobbyPlayers($lobbies: [CreatePlayerLobbyArgs!]!) {\n    createLobbyPlayers(lobbies: $lobbies) {\n      id\n    }\n  }\n": types.CreateLobbyPlayersDocument,
    "\n  mutation createLobbyGroup(\n    $stageId: Int!\n    $sequence: Int!\n    $roundsPlayed: Int!\n  ) {\n    createLobbyGroup(\n      stageId: $stageId\n      sequence: $sequence\n      roundsPlayed: $roundsPlayed\n    ) {\n      id\n    }\n  }\n": types.CreateLobbyGroupDocument,
    "\n  mutation createNLobbyGroup(\n    $stageId: Int!\n    $quantity: Int!\n    $roundsPlayed: Int!\n  ) {\n    createNLobbyGroup(\n      stageId: $stageId\n      quantity: $quantity\n      roundsPlayed: $roundsPlayed\n    ) {\n      id\n    }\n  }\n": types.CreateNLobbyGroupDocument,
    "\n  mutation createNLobby($stageId: Int!, $quantity: Int!, $lobbyGroupId: Int!) {\n    createNLobby(\n      stageId: $stageId\n      quantity: $quantity\n      lobbyGroupId: $lobbyGroupId\n    ) {\n      id\n    }\n  }\n": types.CreateNLobbyDocument,
    "\n  mutation createLobby(\n    $stageId: Int!\n    $sequence: Int!\n    $lobbyGroupId: Int!\n    $name: String\n  ) {\n    createLobby(\n      stageId: $stageId\n      sequence: $sequence\n      lobbyGroupId: $lobbyGroupId\n      name: $name\n    ) {\n      id\n    }\n  }\n": types.CreateLobbyDocument,
    "\n  mutation deleteLobbyGroups($stageId: Int!) {\n    deleteLobbyGroups(stageId: $stageId) {\n      id\n    }\n  }\n": types.DeleteLobbyGroupsDocument,
    "\n  mutation snakeSeed(\n    $stageId: Int!\n    $lobbyGroupId: Int!\n    $type: SnakeSeedType!\n  ) {\n    snakeSeed(stageId: $stageId, lobbyGroupId: $lobbyGroupId, type: $type) {\n      id\n    }\n  }\n": types.SnakeSeedDocument,
    "\n  query oneTournamentWithPlayers($id: Int!) {\n    tournament(id: $id) {\n      id\n      players {\n        id\n        name\n        region\n      }\n    }\n  }\n": types.OneTournamentWithPlayersDocument,
    "\n  query oneStageWithPlayers($id: Int!) {\n    stage(id: $id) {\n      id\n      players {\n        player {\n          id\n          name\n          region\n        }\n      }\n    }\n  }\n": types.OneStageWithPlayersDocument,
    "\n  query oneStageWithLobbyGroups($id: Int!) {\n    stage(id: $id) {\n      id\n      lobbyGroups {\n        id\n        sequence\n      }\n    }\n  }\n": types.OneStageWithLobbyGroupsDocument,
    "\n  mutation generateLobbies($stageId: Int!, $roundsPerLobbyGroup: Int!) {\n    generateLobbies(\n      stageId: $stageId\n      roundsPerLobbyGroup: $roundsPerLobbyGroup\n    ) {\n      createdLobbyGroups\n      createdLobbies\n    }\n  }\n": types.GenerateLobbiesDocument,
    "\n  query listLobbiesWithPlayers($lobbyGroupId: Int!) {\n    lobbies(lobbyGroupId: $lobbyGroupId) {\n      id\n      name\n      players {\n        id\n        name\n        region\n        country\n      }\n    }\n  }\n": types.ListLobbiesWithPlayersDocument,
    "\n  query oneStageIwthPlayers($id: Int!) {\n    stage(id: $id) {\n      id\n      players {\n        player {\n          id\n          name\n          region\n        }\n      }\n    }\n  }\n": types.OneStageIwthPlayersDocument,
    "\n  mutation createStagePlayers($stageId: Int!, $playerIds: [Int!]!) {\n    createStagePlayers(stageId: $stageId, playerIds: $playerIds) {\n      id\n    }\n  }\n": types.CreateStagePlayersDocument,
    "\n  mutation createStagePlayersByName($stageId: Int!, $playerNames: String!) {\n    createStagePlayersByName(stageId: $stageId, playerNames: $playerNames) {\n      id\n    }\n  }\n": types.CreateStagePlayersByNameDocument,
    "\n  query oneStagePlayer($stageId: Int!, $playerId: Int!) {\n    stagePlayer(stageId: $stageId, playerId: $playerId) {\n      stageId\n      playerId\n      extraPoints\n      tiebreakerRanking\n    }\n  }\n": types.OneStagePlayerDocument,
    "\n  mutation updateStagePlayer(\n    $stageId: Int!\n    $playerId: Int!\n    $extraPoints: Int\n    $tiebreakerRanking: Int\n  ) {\n    updateStagePlayer(\n      stageId: $stageId\n      playerId: $playerId\n      extraPoints: $extraPoints\n      tiebreakerRanking: $tiebreakerRanking\n    ) {\n      stageId\n      playerId\n      extraPoints\n      tiebreakerRanking\n    }\n  }\n": types.UpdateStagePlayerDocument,
    "\n  query results($lobbyGroupId: Int!) {\n    resultsByLobbyGroup(lobbyGroupId: $lobbyGroupId) {\n      player {\n        id\n        name\n      }\n      positions\n      lobbyPlayerId\n    }\n  }\n": types.ResultsDocument,
    "\n  mutation createResults(\n    $lobbyGroupId: Int!\n    $results: [CreateLobbyGroupResults!]!\n  ) {\n    createLobbyGroupResult(lobbyGroupId: $lobbyGroupId, results: $results) {\n      roundId\n    }\n  }\n": types.CreateResultsDocument,
    "\n  query oneStageWithLobbyGroupsAndRoundsPlayed($id: Int!) {\n    stage(id: $id) {\n      id\n      lobbyGroups {\n        id\n        sequence\n        roundsPlayed\n      }\n    }\n  }\n": types.OneStageWithLobbyGroupsAndRoundsPlayedDocument,
    "\n  query listLobbiesWithPlayersByLobbyGroup($lobbyGroupId: Int!) {\n    lobbies(lobbyGroupId: $lobbyGroupId) {\n      id\n      name\n      players {\n        id\n        name\n        region\n        country\n      }\n    }\n  }\n": types.ListLobbiesWithPlayersByLobbyGroupDocument,
    "\n  query tiebreakers {\n    tiebreakers {\n      id\n      description\n    }\n  }\n": types.TiebreakersDocument,
    "\n  query oneStageTiebreakers($id: Int!) {\n    stage(id: $id) {\n      id\n      tiebreakers\n    }\n  }\n": types.OneStageTiebreakersDocument,
    "\n  mutation updateTiebreakers($id: Int!, $tiebreakers: [Int!]!) {\n    updateTiebreakers(id: $id, tiebreakers: $tiebreakers) {\n      id\n    }\n  }\n": types.UpdateTiebreakersDocument,
    "\n  mutation carryOverPointsFromLastStage($stageId: Int!) {\n    carryOverPointsFromLastStage(stageId: $stageId) {\n      success\n    }\n  }\n": types.CarryOverPointsFromLastStageDocument,
    "\n  mutation applyTiebreakersToAllStages($stageId: Int!) {\n    applyTiebreakersToAllStages(stageId: $stageId) {\n      id\n    }\n  }\n": types.ApplyTiebreakersToAllStagesDocument,
    "\n  query oneStage($id: Int!) {\n    stage(id: $id) {\n      id\n      name\n      description\n      sequence\n      pointSchemaId\n      roundCount\n      qualifiedCount\n      stageType\n      startDateTime\n    }\n  }\n": types.OneStageDocument,
    "\n  query oneTournamentWithSet($id: Int!) {\n    tournament(id: $id) {\n      id\n      name\n      set {\n        id\n        name\n      }\n    }\n  }\n": types.OneTournamentWithSetDocument,
    "\n  query playersPaginated(\n    $region: String\n    $country: String\n    $searchQuery: String\n  ) {\n    players(\n      region: $region\n      country: $country\n      searchQuery: $searchQuery\n      take: 10\n      skip: 0\n    ) {\n      id\n      name\n      country\n      region\n    }\n  }\n": types.PlayersPaginatedDocument,
    "\n  mutation createTournamentPlayers($tournamentId: Int!, $playerIds: [Int!]!) {\n    createTournamentPlayers(\n      tournamentId: $tournamentId\n      playerIds: $playerIds\n    ) {\n      id\n    }\n  }\n": types.CreateTournamentPlayersDocument,
    "\n  mutation createTournamentPlayersByName(\n    $tournamentId: Int!\n    $playerNames: String!\n  ) {\n    createTournamentPlayersByName(\n      tournamentId: $tournamentId\n      playerNames: $playerNames\n    ) {\n      id\n    }\n  }\n": types.CreateTournamentPlayersByNameDocument,
    "\n  mutation createPlayer(\n    $name: String!\n    $country: String!\n    $region: String!\n    $alias: [String!]\n  ) {\n    createPlayer(\n      name: $name\n      country: $country\n      region: $region\n      alias: $alias\n    ) {\n      id\n    }\n  }\n": types.CreatePlayerDocument,
    "\n  mutation deleteStage($id: Int!) {\n    deleteStage(id: $id) {\n      id\n    }\n  }\n": types.DeleteStageDocument,
    "\n  mutation updateStage(\n    $id: Int!\n    $tournamentId: Int!\n    $pointSchemaId: Int!\n    $name: String!\n    $sequence: Int!\n    $roundCount: Int!\n    $description: String\n    $qualifiedCount: Int!\n    $stageType: StageType!\n    $startDateTime: String\n  ) {\n    updateStage(\n      id: $id\n      tournamentId: $tournamentId\n      pointSchemaId: $pointSchemaId\n      name: $name\n      sequence: $sequence\n      description: $description\n      roundCount: $roundCount\n      qualifiedCount: $qualifiedCount\n      stageType: $stageType\n      startDateTime: $startDateTime\n    ) {\n      id\n    }\n  }\n": types.UpdateStageDocument,
    "\n  query oneTournamentWithStagesAndPointSchema($id: Int!) {\n    tournament(id: $id) {\n      id\n      stages {\n        id\n        name\n        description\n        sequence\n        roundCount\n        pointSchemaId\n        startDateTime\n        pointSchema {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.OneTournamentWithStagesAndPointSchemaDocument,
    "\n  mutation createStage(\n    $tournamentId: Int!\n    $pointSchemaId: Int!\n    $name: String!\n    $sequence: Int!\n    $roundCount: Int!\n    $description: String\n    $qualifiedCount: Int!\n    $stageType: StageType!\n    $startDateTime: String\n  ) {\n    createStage(\n      tournamentId: $tournamentId\n      pointSchemaId: $pointSchemaId\n      name: $name\n      sequence: $sequence\n      description: $description\n      roundCount: $roundCount\n      qualifiedCount: $qualifiedCount\n      stageType: $stageType\n      startDateTime: $startDateTime\n    ) {\n      id\n    }\n  }\n": types.CreateStageDocument,
    "\n  query streams($tournamentId: Int!) {\n    streamsOfTournament(tournamentId: $tournamentId) {\n      tournamentId\n      name\n      link\n      platform\n      language\n      isLive\n      isVOD\n    }\n  }\n": types.StreamsDocument,
    "\n  mutation addTournamentStream(\n    $tournamentId: Int!\n    $name: String!\n    $link: String!\n    $platform: String!\n    $language: String!\n    $isLive: Boolean!\n    $isVOD: Boolean!\n  ) {\n    addTournamentStream(\n      tournamentId: $tournamentId\n      name: $name\n      link: $link\n      platform: $platform\n      language: $language\n      isLive: $isLive\n      isVOD: $isVOD\n    ) {\n      tournamentId\n      name\n    }\n  }\n": types.AddTournamentStreamDocument,
    "\n  mutation deleteTournamentStream($tournamentId: Int!, $name: String!) {\n    deleteTournamentStream(tournamentId: $tournamentId, name: $name) {\n      id\n    }\n  }\n": types.DeleteTournamentStreamDocument,
    "\n  mutation deleteTournament($id: Int!) {\n    deleteTournament(id: $id) {\n      id\n    }\n  }\n": types.DeleteTournamentDocument,
    "\n  mutation updateTournament(\n    $id: Int!\n    $name: String\n    $setId: Int\n    $region: [String!]\n    $host: String\n    $participantsNumber: Int\n    $prizePool: Float\n    $currency: String\n    $startDate: DateTime\n    $endDate: DateTime\n    $visibility: Boolean\n  ) {\n    updateTournament(\n      id: $id\n      name: $name\n      setId: $setId\n      region: $region\n      host: $host\n      participantsNumber: $participantsNumber\n      prizePool: $prizePool\n      currency: $currency\n      startDate: $startDate\n      endDate: $endDate\n      visibility: $visibility\n    ) {\n      id\n    }\n  }\n": types.UpdateTournamentDocument,
    "\n  mutation cloneTournament($tournamentId: Int!, $name: String!, $setId: Int!) {\n    cloneTournament(tournamentId: $tournamentId, name: $name, setId: $setId) {\n      id\n    }\n  }\n": types.CloneTournamentDocument,
    "\n  mutation lockTournament($id: Int!) {\n    lockTournament(id: $id) {\n      tournamentId\n    }\n  }\n": types.LockTournamentDocument,
    "\n  mutation deleteTournamentResults($id: Int!) {\n    deleteTournamentResults(id: $id) {\n      id\n    }\n  }\n": types.DeleteTournamentResultsDocument,
    "\n  query oneTournamentFull($id: Int!) {\n    tournament(id: $id) {\n      id\n      name\n      region\n      host\n      participantsNumber\n      prizePool\n      currency\n      startDate\n      endDate\n      setId\n      visibility\n      set {\n        id\n        name\n      }\n    }\n  }\n": types.OneTournamentFullDocument,
    "\n  query listAdminTournamentsPaginated(\n    $searchQuery: String\n    $skip: Int\n    $take: Int\n  ) {\n    adminTournaments(searchQuery: $searchQuery, skip: $skip, take: $take) {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      set {\n        id\n        name\n      }\n    }\n  }\n": types.ListAdminTournamentsPaginatedDocument,
    "\n  mutation createTournament(\n    $name: String!\n    $region: [String!]!\n    $host: String\n    $participantsNumber: Int\n    $prizePool: Float\n    $startDate: DateTime\n    $endDate: DateTime\n    $setId: Int!\n    $currency: String\n  ) {\n    createTournament(\n      name: $name\n      region: $region\n      host: $host\n      participantsNumber: $participantsNumber\n      prizePool: $prizePool\n      startDate: $startDate\n      endDate: $endDate\n      setId: $setId\n      currency: $currency\n    ) {\n      id\n    }\n  }\n": types.CreateTournamentDocument,
    "\n  mutation createPlayerSlugs {\n    createPlayerSlugs {\n      id\n      name\n      slug\n    }\n  }\n": types.CreatePlayerSlugsDocument,
    "\n  mutation createTournamentSlugs {\n    createTournamentSlugs {\n      id\n      name\n      slug\n    }\n  }\n": types.CreateTournamentSlugsDocument,
    "\n  query playerLinks($playerId: Int!) {\n    player(id: $playerId) {\n      id\n      links {\n        id\n        type\n        link\n      }\n    }\n  }\n": types.PlayerLinksDocument,
    "\n  query listTournamentsPlayedByPlayer($playerId: Int!) {\n    tournamentsPlayed(playerId: $playerId) {\n      id\n      name\n      region\n      slug\n      participantsNumber\n      prizePool\n      currency\n      startDate\n      endDate\n      set {\n        id\n        name\n      }\n      finalPosition\n    }\n  }\n": types.ListTournamentsPlayedByPlayerDocument,
    "\n  query onePlayerBySlug($slug: String!) {\n    playerBySlug(slug: $slug) {\n      id\n      name\n      region\n      country\n      alias\n    }\n  }\n": types.OnePlayerBySlugDocument,
    "\n  query onePlayerWithStats($id: Int!, $setId: Int) {\n    player(id: $id) {\n      id\n      playerStats(setId: $setId) {\n        averagePosition\n        totalGames\n        topFourCount\n        topOneCount\n      }\n    }\n  }\n": types.OnePlayerWithStatsDocument,
    "\n  query players(\n    $region: String\n    $country: String\n    $searchQuery: String\n    $take: Int\n    $skip: Int\n  ) {\n    players(\n      region: $region\n      country: $country\n      searchQuery: $searchQuery\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n      country\n      region\n      slug\n      alias\n    }\n  }\n": types.PlayersDocument,
    "\n  query listTournamentsWithStats($setIds: [Int!]) {\n    tournamentsWithStats(setIds: $setIds) {\n      id\n      name\n      set {\n        id\n        name\n      }\n    }\n  }\n": types.ListTournamentsWithStatsDocument,
    "\n  query listTournamentsWithStatsAndFilter(\n    $searchQuery: String\n    $setIds: [Int!]\n  ) {\n    tournamentsWithStats(searchQuery: $searchQuery, setIds: $setIds) {\n      id\n      name\n      set {\n        id\n        name\n      }\n    }\n  }\n": types.ListTournamentsWithStatsAndFilterDocument,
    "\n  query listSets {\n    sets {\n      id\n      name\n    }\n  }\n": types.ListSetsDocument,
    "\n  query stats(\n    $setIds: [Int!]\n    $regions: [String!]\n    $take: Int\n    $skip: Int\n    $tournamentIds: [Int!]\n    $sort: SortOption\n    $searchQuery: String\n    $minimumGames: Int\n  ) {\n    playerStats(\n      setIds: $setIds\n      regions: $regions\n      take: $take\n      skip: $skip\n      tournamentIds: $tournamentIds\n      sort: $sort\n      searchQuery: $searchQuery\n      minimumGames: $minimumGames\n    ) {\n      player {\n        id\n        name\n        country\n        slug\n      }\n      averagePosition\n      topFourCount\n      topOneCount\n      eigthCount\n      totalGames\n    }\n  }\n": types.StatsDocument,
    "\n  query tournament($slug: String!) {\n    tournamentBySlug(slug: $slug) {\n      id\n      name\n      region\n      host\n      participantsNumber\n      prizePool\n      currency\n      startDate\n      endDate\n      setId\n      set {\n        id\n        name\n      }\n      stages {\n        id\n        name\n        sequence\n        description\n        roundCount\n        stageType\n        qualifiedCount\n      }\n    }\n  }\n": types.TournamentDocument,
    "\n  query listResultsByStage($stageId: Int!) {\n    resultsByStage(stageId: $stageId) {\n      player {\n        id\n        name\n        country\n        slug\n      }\n      positions\n      points\n    }\n  }\n": types.ListResultsByStageDocument,
    "\n  query listLobbyResultsByStage($stageId: Int!) {\n    lobbyResultsByStage(stageId: $stageId) {\n      id\n      roundsPlayed\n      lobbies {\n        id\n        name\n        results {\n          player {\n            id\n            name\n            country\n            slug\n          }\n          positions\n          points\n        }\n      }\n    }\n  }\n": types.ListLobbyResultsByStageDocument,
    "\n  query listUpcomingTournaments(\n    $searchQuery: String\n    $setId: [Int!]\n    $region: [String!]\n    $take: Int\n    $skip: Int\n  ) {\n    upcomingTournaments(\n      searchQuery: $searchQuery\n      setId: $setId\n      region: $region\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      slug\n      set {\n        id\n        name\n      }\n    }\n  }\n": types.ListUpcomingTournamentsDocument,
    "\n  query listOngoingTournaments {\n    ongoingTournaments {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      slug\n      set {\n        id\n        name\n      }\n      nextStartTime\n    }\n  }\n": types.ListOngoingTournamentsDocument,
    "\n  query listPastTournaments(\n    $searchQuery: String\n    $setId: [Int!]\n    $region: [String!]\n    $take: Int\n    $skip: Int\n  ) {\n    pastTournaments(\n      searchQuery: $searchQuery\n      setId: $setId\n      region: $region\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      slug\n      set {\n        id\n        name\n      }\n    }\n  }\n": types.ListPastTournamentsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query sets {\n    sets {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query sets {\n    sets {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listPointSchemas {\n    pointSchemas {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query listPointSchemas {\n    pointSchemas {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query adminPlayerLinks($id: Int!) {\n    player(id: $id) {\n      id\n      links {\n        id\n        type\n        link\n      }\n    }\n  }\n"): (typeof documents)["\n  query adminPlayerLinks($id: Int!) {\n    player(id: $id) {\n      id\n      links {\n        id\n        type\n        link\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPlayerLink($playerId: Int!, $link: String!, $type: String!) {\n    createPlayerLink(playerId: $playerId, link: $link, type: $type) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createPlayerLink($playerId: Int!, $link: String!, $type: String!) {\n    createPlayerLink(playerId: $playerId, link: $link, type: $type) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deletePlayerLink($id: Int!) {\n    deletePlayerLink(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deletePlayerLink($id: Int!) {\n    deletePlayerLink(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query adminPlayer($id: Int!) {\n    player(id: $id) {\n      id\n      name\n      country\n      region\n      slug\n      alias\n    }\n  }\n"): (typeof documents)["\n  query adminPlayer($id: Int!) {\n    player(id: $id) {\n      id\n      name\n      country\n      region\n      slug\n      alias\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listAdminPlayers($searchQuery: String) {\n    adminPlayers(searchQuery: $searchQuery, take: 20) {\n      id\n      name\n      region\n      country\n      alias\n    }\n  }\n"): (typeof documents)["\n  query listAdminPlayers($searchQuery: String) {\n    adminPlayers(searchQuery: $searchQuery, take: 20) {\n      id\n      name\n      region\n      country\n      alias\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deletePlayer($id: Int!) {\n    deletePlayer(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deletePlayer($id: Int!) {\n    deletePlayer(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updatePlayer(\n    $id: Int!\n    $name: String\n    $country: String\n    $region: String\n    $slug: String\n    $alias: [String!]\n  ) {\n    updatePlayer(\n      id: $id\n      name: $name\n      country: $country\n      region: $region\n      slug: $slug\n      alias: $alias\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updatePlayer(\n    $id: Int!\n    $name: String\n    $country: String\n    $region: String\n    $slug: String\n    $alias: [String!]\n  ) {\n    updatePlayer(\n      id: $id\n      name: $name\n      country: $country\n      region: $region\n      slug: $slug\n      alias: $alias\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation mergePlayer($playerIdToMaintain: Int!, $playerIdToRemove: Int!) {\n    mergePlayer(\n      playerIdToMaintain: $playerIdToMaintain\n      playerIdToRemove: $playerIdToRemove\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation mergePlayer($playerIdToMaintain: Int!, $playerIdToRemove: Int!) {\n    mergePlayer(\n      playerIdToMaintain: $playerIdToMaintain\n      playerIdToRemove: $playerIdToRemove\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createLobbyPlayers($lobbies: [CreatePlayerLobbyArgs!]!) {\n    createLobbyPlayers(lobbies: $lobbies) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createLobbyPlayers($lobbies: [CreatePlayerLobbyArgs!]!) {\n    createLobbyPlayers(lobbies: $lobbies) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createLobbyGroup(\n    $stageId: Int!\n    $sequence: Int!\n    $roundsPlayed: Int!\n  ) {\n    createLobbyGroup(\n      stageId: $stageId\n      sequence: $sequence\n      roundsPlayed: $roundsPlayed\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createLobbyGroup(\n    $stageId: Int!\n    $sequence: Int!\n    $roundsPlayed: Int!\n  ) {\n    createLobbyGroup(\n      stageId: $stageId\n      sequence: $sequence\n      roundsPlayed: $roundsPlayed\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createNLobbyGroup(\n    $stageId: Int!\n    $quantity: Int!\n    $roundsPlayed: Int!\n  ) {\n    createNLobbyGroup(\n      stageId: $stageId\n      quantity: $quantity\n      roundsPlayed: $roundsPlayed\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createNLobbyGroup(\n    $stageId: Int!\n    $quantity: Int!\n    $roundsPlayed: Int!\n  ) {\n    createNLobbyGroup(\n      stageId: $stageId\n      quantity: $quantity\n      roundsPlayed: $roundsPlayed\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createNLobby($stageId: Int!, $quantity: Int!, $lobbyGroupId: Int!) {\n    createNLobby(\n      stageId: $stageId\n      quantity: $quantity\n      lobbyGroupId: $lobbyGroupId\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createNLobby($stageId: Int!, $quantity: Int!, $lobbyGroupId: Int!) {\n    createNLobby(\n      stageId: $stageId\n      quantity: $quantity\n      lobbyGroupId: $lobbyGroupId\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createLobby(\n    $stageId: Int!\n    $sequence: Int!\n    $lobbyGroupId: Int!\n    $name: String\n  ) {\n    createLobby(\n      stageId: $stageId\n      sequence: $sequence\n      lobbyGroupId: $lobbyGroupId\n      name: $name\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createLobby(\n    $stageId: Int!\n    $sequence: Int!\n    $lobbyGroupId: Int!\n    $name: String\n  ) {\n    createLobby(\n      stageId: $stageId\n      sequence: $sequence\n      lobbyGroupId: $lobbyGroupId\n      name: $name\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteLobbyGroups($stageId: Int!) {\n    deleteLobbyGroups(stageId: $stageId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteLobbyGroups($stageId: Int!) {\n    deleteLobbyGroups(stageId: $stageId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation snakeSeed(\n    $stageId: Int!\n    $lobbyGroupId: Int!\n    $type: SnakeSeedType!\n  ) {\n    snakeSeed(stageId: $stageId, lobbyGroupId: $lobbyGroupId, type: $type) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation snakeSeed(\n    $stageId: Int!\n    $lobbyGroupId: Int!\n    $type: SnakeSeedType!\n  ) {\n    snakeSeed(stageId: $stageId, lobbyGroupId: $lobbyGroupId, type: $type) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneTournamentWithPlayers($id: Int!) {\n    tournament(id: $id) {\n      id\n      players {\n        id\n        name\n        region\n      }\n    }\n  }\n"): (typeof documents)["\n  query oneTournamentWithPlayers($id: Int!) {\n    tournament(id: $id) {\n      id\n      players {\n        id\n        name\n        region\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneStageWithPlayers($id: Int!) {\n    stage(id: $id) {\n      id\n      players {\n        player {\n          id\n          name\n          region\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query oneStageWithPlayers($id: Int!) {\n    stage(id: $id) {\n      id\n      players {\n        player {\n          id\n          name\n          region\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneStageWithLobbyGroups($id: Int!) {\n    stage(id: $id) {\n      id\n      lobbyGroups {\n        id\n        sequence\n      }\n    }\n  }\n"): (typeof documents)["\n  query oneStageWithLobbyGroups($id: Int!) {\n    stage(id: $id) {\n      id\n      lobbyGroups {\n        id\n        sequence\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation generateLobbies($stageId: Int!, $roundsPerLobbyGroup: Int!) {\n    generateLobbies(\n      stageId: $stageId\n      roundsPerLobbyGroup: $roundsPerLobbyGroup\n    ) {\n      createdLobbyGroups\n      createdLobbies\n    }\n  }\n"): (typeof documents)["\n  mutation generateLobbies($stageId: Int!, $roundsPerLobbyGroup: Int!) {\n    generateLobbies(\n      stageId: $stageId\n      roundsPerLobbyGroup: $roundsPerLobbyGroup\n    ) {\n      createdLobbyGroups\n      createdLobbies\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listLobbiesWithPlayers($lobbyGroupId: Int!) {\n    lobbies(lobbyGroupId: $lobbyGroupId) {\n      id\n      name\n      players {\n        id\n        name\n        region\n        country\n      }\n    }\n  }\n"): (typeof documents)["\n  query listLobbiesWithPlayers($lobbyGroupId: Int!) {\n    lobbies(lobbyGroupId: $lobbyGroupId) {\n      id\n      name\n      players {\n        id\n        name\n        region\n        country\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneStageIwthPlayers($id: Int!) {\n    stage(id: $id) {\n      id\n      players {\n        player {\n          id\n          name\n          region\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query oneStageIwthPlayers($id: Int!) {\n    stage(id: $id) {\n      id\n      players {\n        player {\n          id\n          name\n          region\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createStagePlayers($stageId: Int!, $playerIds: [Int!]!) {\n    createStagePlayers(stageId: $stageId, playerIds: $playerIds) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createStagePlayers($stageId: Int!, $playerIds: [Int!]!) {\n    createStagePlayers(stageId: $stageId, playerIds: $playerIds) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createStagePlayersByName($stageId: Int!, $playerNames: String!) {\n    createStagePlayersByName(stageId: $stageId, playerNames: $playerNames) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createStagePlayersByName($stageId: Int!, $playerNames: String!) {\n    createStagePlayersByName(stageId: $stageId, playerNames: $playerNames) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneStagePlayer($stageId: Int!, $playerId: Int!) {\n    stagePlayer(stageId: $stageId, playerId: $playerId) {\n      stageId\n      playerId\n      extraPoints\n      tiebreakerRanking\n    }\n  }\n"): (typeof documents)["\n  query oneStagePlayer($stageId: Int!, $playerId: Int!) {\n    stagePlayer(stageId: $stageId, playerId: $playerId) {\n      stageId\n      playerId\n      extraPoints\n      tiebreakerRanking\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateStagePlayer(\n    $stageId: Int!\n    $playerId: Int!\n    $extraPoints: Int\n    $tiebreakerRanking: Int\n  ) {\n    updateStagePlayer(\n      stageId: $stageId\n      playerId: $playerId\n      extraPoints: $extraPoints\n      tiebreakerRanking: $tiebreakerRanking\n    ) {\n      stageId\n      playerId\n      extraPoints\n      tiebreakerRanking\n    }\n  }\n"): (typeof documents)["\n  mutation updateStagePlayer(\n    $stageId: Int!\n    $playerId: Int!\n    $extraPoints: Int\n    $tiebreakerRanking: Int\n  ) {\n    updateStagePlayer(\n      stageId: $stageId\n      playerId: $playerId\n      extraPoints: $extraPoints\n      tiebreakerRanking: $tiebreakerRanking\n    ) {\n      stageId\n      playerId\n      extraPoints\n      tiebreakerRanking\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query results($lobbyGroupId: Int!) {\n    resultsByLobbyGroup(lobbyGroupId: $lobbyGroupId) {\n      player {\n        id\n        name\n      }\n      positions\n      lobbyPlayerId\n    }\n  }\n"): (typeof documents)["\n  query results($lobbyGroupId: Int!) {\n    resultsByLobbyGroup(lobbyGroupId: $lobbyGroupId) {\n      player {\n        id\n        name\n      }\n      positions\n      lobbyPlayerId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createResults(\n    $lobbyGroupId: Int!\n    $results: [CreateLobbyGroupResults!]!\n  ) {\n    createLobbyGroupResult(lobbyGroupId: $lobbyGroupId, results: $results) {\n      roundId\n    }\n  }\n"): (typeof documents)["\n  mutation createResults(\n    $lobbyGroupId: Int!\n    $results: [CreateLobbyGroupResults!]!\n  ) {\n    createLobbyGroupResult(lobbyGroupId: $lobbyGroupId, results: $results) {\n      roundId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneStageWithLobbyGroupsAndRoundsPlayed($id: Int!) {\n    stage(id: $id) {\n      id\n      lobbyGroups {\n        id\n        sequence\n        roundsPlayed\n      }\n    }\n  }\n"): (typeof documents)["\n  query oneStageWithLobbyGroupsAndRoundsPlayed($id: Int!) {\n    stage(id: $id) {\n      id\n      lobbyGroups {\n        id\n        sequence\n        roundsPlayed\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listLobbiesWithPlayersByLobbyGroup($lobbyGroupId: Int!) {\n    lobbies(lobbyGroupId: $lobbyGroupId) {\n      id\n      name\n      players {\n        id\n        name\n        region\n        country\n      }\n    }\n  }\n"): (typeof documents)["\n  query listLobbiesWithPlayersByLobbyGroup($lobbyGroupId: Int!) {\n    lobbies(lobbyGroupId: $lobbyGroupId) {\n      id\n      name\n      players {\n        id\n        name\n        region\n        country\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query tiebreakers {\n    tiebreakers {\n      id\n      description\n    }\n  }\n"): (typeof documents)["\n  query tiebreakers {\n    tiebreakers {\n      id\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneStageTiebreakers($id: Int!) {\n    stage(id: $id) {\n      id\n      tiebreakers\n    }\n  }\n"): (typeof documents)["\n  query oneStageTiebreakers($id: Int!) {\n    stage(id: $id) {\n      id\n      tiebreakers\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTiebreakers($id: Int!, $tiebreakers: [Int!]!) {\n    updateTiebreakers(id: $id, tiebreakers: $tiebreakers) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateTiebreakers($id: Int!, $tiebreakers: [Int!]!) {\n    updateTiebreakers(id: $id, tiebreakers: $tiebreakers) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation carryOverPointsFromLastStage($stageId: Int!) {\n    carryOverPointsFromLastStage(stageId: $stageId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation carryOverPointsFromLastStage($stageId: Int!) {\n    carryOverPointsFromLastStage(stageId: $stageId) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation applyTiebreakersToAllStages($stageId: Int!) {\n    applyTiebreakersToAllStages(stageId: $stageId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation applyTiebreakersToAllStages($stageId: Int!) {\n    applyTiebreakersToAllStages(stageId: $stageId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneStage($id: Int!) {\n    stage(id: $id) {\n      id\n      name\n      description\n      sequence\n      pointSchemaId\n      roundCount\n      qualifiedCount\n      stageType\n      startDateTime\n    }\n  }\n"): (typeof documents)["\n  query oneStage($id: Int!) {\n    stage(id: $id) {\n      id\n      name\n      description\n      sequence\n      pointSchemaId\n      roundCount\n      qualifiedCount\n      stageType\n      startDateTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneTournamentWithSet($id: Int!) {\n    tournament(id: $id) {\n      id\n      name\n      set {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query oneTournamentWithSet($id: Int!) {\n    tournament(id: $id) {\n      id\n      name\n      set {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query playersPaginated(\n    $region: String\n    $country: String\n    $searchQuery: String\n  ) {\n    players(\n      region: $region\n      country: $country\n      searchQuery: $searchQuery\n      take: 10\n      skip: 0\n    ) {\n      id\n      name\n      country\n      region\n    }\n  }\n"): (typeof documents)["\n  query playersPaginated(\n    $region: String\n    $country: String\n    $searchQuery: String\n  ) {\n    players(\n      region: $region\n      country: $country\n      searchQuery: $searchQuery\n      take: 10\n      skip: 0\n    ) {\n      id\n      name\n      country\n      region\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTournamentPlayers($tournamentId: Int!, $playerIds: [Int!]!) {\n    createTournamentPlayers(\n      tournamentId: $tournamentId\n      playerIds: $playerIds\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createTournamentPlayers($tournamentId: Int!, $playerIds: [Int!]!) {\n    createTournamentPlayers(\n      tournamentId: $tournamentId\n      playerIds: $playerIds\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTournamentPlayersByName(\n    $tournamentId: Int!\n    $playerNames: String!\n  ) {\n    createTournamentPlayersByName(\n      tournamentId: $tournamentId\n      playerNames: $playerNames\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createTournamentPlayersByName(\n    $tournamentId: Int!\n    $playerNames: String!\n  ) {\n    createTournamentPlayersByName(\n      tournamentId: $tournamentId\n      playerNames: $playerNames\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPlayer(\n    $name: String!\n    $country: String!\n    $region: String!\n    $alias: [String!]\n  ) {\n    createPlayer(\n      name: $name\n      country: $country\n      region: $region\n      alias: $alias\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createPlayer(\n    $name: String!\n    $country: String!\n    $region: String!\n    $alias: [String!]\n  ) {\n    createPlayer(\n      name: $name\n      country: $country\n      region: $region\n      alias: $alias\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteStage($id: Int!) {\n    deleteStage(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteStage($id: Int!) {\n    deleteStage(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateStage(\n    $id: Int!\n    $tournamentId: Int!\n    $pointSchemaId: Int!\n    $name: String!\n    $sequence: Int!\n    $roundCount: Int!\n    $description: String\n    $qualifiedCount: Int!\n    $stageType: StageType!\n    $startDateTime: String\n  ) {\n    updateStage(\n      id: $id\n      tournamentId: $tournamentId\n      pointSchemaId: $pointSchemaId\n      name: $name\n      sequence: $sequence\n      description: $description\n      roundCount: $roundCount\n      qualifiedCount: $qualifiedCount\n      stageType: $stageType\n      startDateTime: $startDateTime\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateStage(\n    $id: Int!\n    $tournamentId: Int!\n    $pointSchemaId: Int!\n    $name: String!\n    $sequence: Int!\n    $roundCount: Int!\n    $description: String\n    $qualifiedCount: Int!\n    $stageType: StageType!\n    $startDateTime: String\n  ) {\n    updateStage(\n      id: $id\n      tournamentId: $tournamentId\n      pointSchemaId: $pointSchemaId\n      name: $name\n      sequence: $sequence\n      description: $description\n      roundCount: $roundCount\n      qualifiedCount: $qualifiedCount\n      stageType: $stageType\n      startDateTime: $startDateTime\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneTournamentWithStagesAndPointSchema($id: Int!) {\n    tournament(id: $id) {\n      id\n      stages {\n        id\n        name\n        description\n        sequence\n        roundCount\n        pointSchemaId\n        startDateTime\n        pointSchema {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query oneTournamentWithStagesAndPointSchema($id: Int!) {\n    tournament(id: $id) {\n      id\n      stages {\n        id\n        name\n        description\n        sequence\n        roundCount\n        pointSchemaId\n        startDateTime\n        pointSchema {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createStage(\n    $tournamentId: Int!\n    $pointSchemaId: Int!\n    $name: String!\n    $sequence: Int!\n    $roundCount: Int!\n    $description: String\n    $qualifiedCount: Int!\n    $stageType: StageType!\n    $startDateTime: String\n  ) {\n    createStage(\n      tournamentId: $tournamentId\n      pointSchemaId: $pointSchemaId\n      name: $name\n      sequence: $sequence\n      description: $description\n      roundCount: $roundCount\n      qualifiedCount: $qualifiedCount\n      stageType: $stageType\n      startDateTime: $startDateTime\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createStage(\n    $tournamentId: Int!\n    $pointSchemaId: Int!\n    $name: String!\n    $sequence: Int!\n    $roundCount: Int!\n    $description: String\n    $qualifiedCount: Int!\n    $stageType: StageType!\n    $startDateTime: String\n  ) {\n    createStage(\n      tournamentId: $tournamentId\n      pointSchemaId: $pointSchemaId\n      name: $name\n      sequence: $sequence\n      description: $description\n      roundCount: $roundCount\n      qualifiedCount: $qualifiedCount\n      stageType: $stageType\n      startDateTime: $startDateTime\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query streams($tournamentId: Int!) {\n    streamsOfTournament(tournamentId: $tournamentId) {\n      tournamentId\n      name\n      link\n      platform\n      language\n      isLive\n      isVOD\n    }\n  }\n"): (typeof documents)["\n  query streams($tournamentId: Int!) {\n    streamsOfTournament(tournamentId: $tournamentId) {\n      tournamentId\n      name\n      link\n      platform\n      language\n      isLive\n      isVOD\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addTournamentStream(\n    $tournamentId: Int!\n    $name: String!\n    $link: String!\n    $platform: String!\n    $language: String!\n    $isLive: Boolean!\n    $isVOD: Boolean!\n  ) {\n    addTournamentStream(\n      tournamentId: $tournamentId\n      name: $name\n      link: $link\n      platform: $platform\n      language: $language\n      isLive: $isLive\n      isVOD: $isVOD\n    ) {\n      tournamentId\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation addTournamentStream(\n    $tournamentId: Int!\n    $name: String!\n    $link: String!\n    $platform: String!\n    $language: String!\n    $isLive: Boolean!\n    $isVOD: Boolean!\n  ) {\n    addTournamentStream(\n      tournamentId: $tournamentId\n      name: $name\n      link: $link\n      platform: $platform\n      language: $language\n      isLive: $isLive\n      isVOD: $isVOD\n    ) {\n      tournamentId\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTournamentStream($tournamentId: Int!, $name: String!) {\n    deleteTournamentStream(tournamentId: $tournamentId, name: $name) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTournamentStream($tournamentId: Int!, $name: String!) {\n    deleteTournamentStream(tournamentId: $tournamentId, name: $name) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTournament($id: Int!) {\n    deleteTournament(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTournament($id: Int!) {\n    deleteTournament(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTournament(\n    $id: Int!\n    $name: String\n    $setId: Int\n    $region: [String!]\n    $host: String\n    $participantsNumber: Int\n    $prizePool: Float\n    $currency: String\n    $startDate: DateTime\n    $endDate: DateTime\n    $visibility: Boolean\n  ) {\n    updateTournament(\n      id: $id\n      name: $name\n      setId: $setId\n      region: $region\n      host: $host\n      participantsNumber: $participantsNumber\n      prizePool: $prizePool\n      currency: $currency\n      startDate: $startDate\n      endDate: $endDate\n      visibility: $visibility\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateTournament(\n    $id: Int!\n    $name: String\n    $setId: Int\n    $region: [String!]\n    $host: String\n    $participantsNumber: Int\n    $prizePool: Float\n    $currency: String\n    $startDate: DateTime\n    $endDate: DateTime\n    $visibility: Boolean\n  ) {\n    updateTournament(\n      id: $id\n      name: $name\n      setId: $setId\n      region: $region\n      host: $host\n      participantsNumber: $participantsNumber\n      prizePool: $prizePool\n      currency: $currency\n      startDate: $startDate\n      endDate: $endDate\n      visibility: $visibility\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation cloneTournament($tournamentId: Int!, $name: String!, $setId: Int!) {\n    cloneTournament(tournamentId: $tournamentId, name: $name, setId: $setId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation cloneTournament($tournamentId: Int!, $name: String!, $setId: Int!) {\n    cloneTournament(tournamentId: $tournamentId, name: $name, setId: $setId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation lockTournament($id: Int!) {\n    lockTournament(id: $id) {\n      tournamentId\n    }\n  }\n"): (typeof documents)["\n  mutation lockTournament($id: Int!) {\n    lockTournament(id: $id) {\n      tournamentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTournamentResults($id: Int!) {\n    deleteTournamentResults(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTournamentResults($id: Int!) {\n    deleteTournamentResults(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneTournamentFull($id: Int!) {\n    tournament(id: $id) {\n      id\n      name\n      region\n      host\n      participantsNumber\n      prizePool\n      currency\n      startDate\n      endDate\n      setId\n      visibility\n      set {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query oneTournamentFull($id: Int!) {\n    tournament(id: $id) {\n      id\n      name\n      region\n      host\n      participantsNumber\n      prizePool\n      currency\n      startDate\n      endDate\n      setId\n      visibility\n      set {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listAdminTournamentsPaginated(\n    $searchQuery: String\n    $skip: Int\n    $take: Int\n  ) {\n    adminTournaments(searchQuery: $searchQuery, skip: $skip, take: $take) {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      set {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query listAdminTournamentsPaginated(\n    $searchQuery: String\n    $skip: Int\n    $take: Int\n  ) {\n    adminTournaments(searchQuery: $searchQuery, skip: $skip, take: $take) {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      set {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTournament(\n    $name: String!\n    $region: [String!]!\n    $host: String\n    $participantsNumber: Int\n    $prizePool: Float\n    $startDate: DateTime\n    $endDate: DateTime\n    $setId: Int!\n    $currency: String\n  ) {\n    createTournament(\n      name: $name\n      region: $region\n      host: $host\n      participantsNumber: $participantsNumber\n      prizePool: $prizePool\n      startDate: $startDate\n      endDate: $endDate\n      setId: $setId\n      currency: $currency\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createTournament(\n    $name: String!\n    $region: [String!]!\n    $host: String\n    $participantsNumber: Int\n    $prizePool: Float\n    $startDate: DateTime\n    $endDate: DateTime\n    $setId: Int!\n    $currency: String\n  ) {\n    createTournament(\n      name: $name\n      region: $region\n      host: $host\n      participantsNumber: $participantsNumber\n      prizePool: $prizePool\n      startDate: $startDate\n      endDate: $endDate\n      setId: $setId\n      currency: $currency\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPlayerSlugs {\n    createPlayerSlugs {\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation createPlayerSlugs {\n    createPlayerSlugs {\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTournamentSlugs {\n    createTournamentSlugs {\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation createTournamentSlugs {\n    createTournamentSlugs {\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query playerLinks($playerId: Int!) {\n    player(id: $playerId) {\n      id\n      links {\n        id\n        type\n        link\n      }\n    }\n  }\n"): (typeof documents)["\n  query playerLinks($playerId: Int!) {\n    player(id: $playerId) {\n      id\n      links {\n        id\n        type\n        link\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listTournamentsPlayedByPlayer($playerId: Int!) {\n    tournamentsPlayed(playerId: $playerId) {\n      id\n      name\n      region\n      slug\n      participantsNumber\n      prizePool\n      currency\n      startDate\n      endDate\n      set {\n        id\n        name\n      }\n      finalPosition\n    }\n  }\n"): (typeof documents)["\n  query listTournamentsPlayedByPlayer($playerId: Int!) {\n    tournamentsPlayed(playerId: $playerId) {\n      id\n      name\n      region\n      slug\n      participantsNumber\n      prizePool\n      currency\n      startDate\n      endDate\n      set {\n        id\n        name\n      }\n      finalPosition\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query onePlayerBySlug($slug: String!) {\n    playerBySlug(slug: $slug) {\n      id\n      name\n      region\n      country\n      alias\n    }\n  }\n"): (typeof documents)["\n  query onePlayerBySlug($slug: String!) {\n    playerBySlug(slug: $slug) {\n      id\n      name\n      region\n      country\n      alias\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query onePlayerWithStats($id: Int!, $setId: Int) {\n    player(id: $id) {\n      id\n      playerStats(setId: $setId) {\n        averagePosition\n        totalGames\n        topFourCount\n        topOneCount\n      }\n    }\n  }\n"): (typeof documents)["\n  query onePlayerWithStats($id: Int!, $setId: Int) {\n    player(id: $id) {\n      id\n      playerStats(setId: $setId) {\n        averagePosition\n        totalGames\n        topFourCount\n        topOneCount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query players(\n    $region: String\n    $country: String\n    $searchQuery: String\n    $take: Int\n    $skip: Int\n  ) {\n    players(\n      region: $region\n      country: $country\n      searchQuery: $searchQuery\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n      country\n      region\n      slug\n      alias\n    }\n  }\n"): (typeof documents)["\n  query players(\n    $region: String\n    $country: String\n    $searchQuery: String\n    $take: Int\n    $skip: Int\n  ) {\n    players(\n      region: $region\n      country: $country\n      searchQuery: $searchQuery\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n      country\n      region\n      slug\n      alias\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listTournamentsWithStats($setIds: [Int!]) {\n    tournamentsWithStats(setIds: $setIds) {\n      id\n      name\n      set {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query listTournamentsWithStats($setIds: [Int!]) {\n    tournamentsWithStats(setIds: $setIds) {\n      id\n      name\n      set {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listTournamentsWithStatsAndFilter(\n    $searchQuery: String\n    $setIds: [Int!]\n  ) {\n    tournamentsWithStats(searchQuery: $searchQuery, setIds: $setIds) {\n      id\n      name\n      set {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query listTournamentsWithStatsAndFilter(\n    $searchQuery: String\n    $setIds: [Int!]\n  ) {\n    tournamentsWithStats(searchQuery: $searchQuery, setIds: $setIds) {\n      id\n      name\n      set {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listSets {\n    sets {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query listSets {\n    sets {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query stats(\n    $setIds: [Int!]\n    $regions: [String!]\n    $take: Int\n    $skip: Int\n    $tournamentIds: [Int!]\n    $sort: SortOption\n    $searchQuery: String\n    $minimumGames: Int\n  ) {\n    playerStats(\n      setIds: $setIds\n      regions: $regions\n      take: $take\n      skip: $skip\n      tournamentIds: $tournamentIds\n      sort: $sort\n      searchQuery: $searchQuery\n      minimumGames: $minimumGames\n    ) {\n      player {\n        id\n        name\n        country\n        slug\n      }\n      averagePosition\n      topFourCount\n      topOneCount\n      eigthCount\n      totalGames\n    }\n  }\n"): (typeof documents)["\n  query stats(\n    $setIds: [Int!]\n    $regions: [String!]\n    $take: Int\n    $skip: Int\n    $tournamentIds: [Int!]\n    $sort: SortOption\n    $searchQuery: String\n    $minimumGames: Int\n  ) {\n    playerStats(\n      setIds: $setIds\n      regions: $regions\n      take: $take\n      skip: $skip\n      tournamentIds: $tournamentIds\n      sort: $sort\n      searchQuery: $searchQuery\n      minimumGames: $minimumGames\n    ) {\n      player {\n        id\n        name\n        country\n        slug\n      }\n      averagePosition\n      topFourCount\n      topOneCount\n      eigthCount\n      totalGames\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query tournament($slug: String!) {\n    tournamentBySlug(slug: $slug) {\n      id\n      name\n      region\n      host\n      participantsNumber\n      prizePool\n      currency\n      startDate\n      endDate\n      setId\n      set {\n        id\n        name\n      }\n      stages {\n        id\n        name\n        sequence\n        description\n        roundCount\n        stageType\n        qualifiedCount\n      }\n    }\n  }\n"): (typeof documents)["\n  query tournament($slug: String!) {\n    tournamentBySlug(slug: $slug) {\n      id\n      name\n      region\n      host\n      participantsNumber\n      prizePool\n      currency\n      startDate\n      endDate\n      setId\n      set {\n        id\n        name\n      }\n      stages {\n        id\n        name\n        sequence\n        description\n        roundCount\n        stageType\n        qualifiedCount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listResultsByStage($stageId: Int!) {\n    resultsByStage(stageId: $stageId) {\n      player {\n        id\n        name\n        country\n        slug\n      }\n      positions\n      points\n    }\n  }\n"): (typeof documents)["\n  query listResultsByStage($stageId: Int!) {\n    resultsByStage(stageId: $stageId) {\n      player {\n        id\n        name\n        country\n        slug\n      }\n      positions\n      points\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listLobbyResultsByStage($stageId: Int!) {\n    lobbyResultsByStage(stageId: $stageId) {\n      id\n      roundsPlayed\n      lobbies {\n        id\n        name\n        results {\n          player {\n            id\n            name\n            country\n            slug\n          }\n          positions\n          points\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query listLobbyResultsByStage($stageId: Int!) {\n    lobbyResultsByStage(stageId: $stageId) {\n      id\n      roundsPlayed\n      lobbies {\n        id\n        name\n        results {\n          player {\n            id\n            name\n            country\n            slug\n          }\n          positions\n          points\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listUpcomingTournaments(\n    $searchQuery: String\n    $setId: [Int!]\n    $region: [String!]\n    $take: Int\n    $skip: Int\n  ) {\n    upcomingTournaments(\n      searchQuery: $searchQuery\n      setId: $setId\n      region: $region\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      slug\n      set {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query listUpcomingTournaments(\n    $searchQuery: String\n    $setId: [Int!]\n    $region: [String!]\n    $take: Int\n    $skip: Int\n  ) {\n    upcomingTournaments(\n      searchQuery: $searchQuery\n      setId: $setId\n      region: $region\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      slug\n      set {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listOngoingTournaments {\n    ongoingTournaments {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      slug\n      set {\n        id\n        name\n      }\n      nextStartTime\n    }\n  }\n"): (typeof documents)["\n  query listOngoingTournaments {\n    ongoingTournaments {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      slug\n      set {\n        id\n        name\n      }\n      nextStartTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listPastTournaments(\n    $searchQuery: String\n    $setId: [Int!]\n    $region: [String!]\n    $take: Int\n    $skip: Int\n  ) {\n    pastTournaments(\n      searchQuery: $searchQuery\n      setId: $setId\n      region: $region\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      slug\n      set {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query listPastTournaments(\n    $searchQuery: String\n    $setId: [Int!]\n    $region: [String!]\n    $take: Int\n    $skip: Int\n  ) {\n    pastTournaments(\n      searchQuery: $searchQuery\n      setId: $setId\n      region: $region\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n      participantsNumber\n      prizePool\n      currency\n      region\n      startDate\n      endDate\n      slug\n      set {\n        id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;