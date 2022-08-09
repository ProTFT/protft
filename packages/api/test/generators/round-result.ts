import { RoundResult } from "../../src/round-results/round-result.entity";
import { lobby as genLobby } from "./lobby";
import { player as genPlayer } from "./player";
import { round as genRound } from "./round";

export function roundResult({
  lobbyId,
  playerId,
  position,
  roundId,
}: Partial<RoundResult>): RoundResult {
  const randomId = Math.random() * 999;
  return {
    lobbyId: lobbyId || randomId,
    lobby: genLobby({}),
    player: genPlayer({}),
    playerId: playerId || randomId,
    position: position || 0,
    round: genRound({}),
    roundId: roundId || randomId,
  };
}
