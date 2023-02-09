export interface CreateOneLobbyPlayerInfoArgs {
  lobbyId: number;
  playerId: number;
}

export interface CreateManyLobbyPlayerInfoArgs {
  lobbyId: number;
  playerIds: number[];
}
