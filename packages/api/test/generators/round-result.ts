import { RoundResult } from "../../src/round-results/round-result.entity";
import { round as genRound } from "./round";
import { lobbyPlayerInfo as genLobbyPlayerInfo } from "./lobby-player-info";

export function roundResult({
  lobbyPlayerId,
  lobbyPlayerInfo,
  position,
  roundId,
  round,
}: Partial<RoundResult>): RoundResult {
  const randomId = Math.random() * 999;
  return {
    lobbyPlayerId: lobbyPlayerId || randomId,
    lobbyPlayerInfo: lobbyPlayerInfo || genLobbyPlayerInfo({}),
    position: position || randomId,
    roundId: roundId || randomId,
    round: round || genRound({}),
  };
}
