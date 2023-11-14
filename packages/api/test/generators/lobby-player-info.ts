import { lobby as genLobby } from "./lobby";
import { player as genPlayer } from "./player";
import { LobbyPlayerInfo } from "../../src/lobby-player-infos/lobby-player-info.entity";
import { BaseProps } from "./base-props";

export function lobbyPlayerInfo({
  id,
  lobby,
  lobbyId,
  player,
  playerId,
}: Partial<LobbyPlayerInfo>): LobbyPlayerInfo {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    lobby: lobby || genLobby({}),
    lobbyId: lobbyId || randomId,
    player: player || genPlayer({}),
    playerId: playerId || randomId,
    ...BaseProps(),
  };
}
