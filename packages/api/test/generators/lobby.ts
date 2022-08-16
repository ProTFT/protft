import { Lobby } from "../../src/lobbies/lobby.entity";
import { stage as genStage } from "./stage";

export function lobby({
  id,
  name,
  playersResults,
  roundCount,
  sequence,
  stage,
  stageId,
  players,
}: Partial<Lobby>): Lobby {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    name: name || "",
    playersResults: playersResults || [],
    roundCount: roundCount || randomId,
    sequence: sequence || randomId,
    stage: stage || genStage({}),
    stageId: stageId || randomId,
    players: players || [],
  };
}
