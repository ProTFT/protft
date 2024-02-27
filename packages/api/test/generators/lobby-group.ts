import { LobbyGroup } from "../../src/lobbies/lobby-group.entity";
import { BaseProps } from "./base-props";
import { stage as genStage } from "./stage";

export function lobbyGroup({
  id,
  sequence,
  stage,
  stageId,
  roundsPlayed,
}: Partial<LobbyGroup>): LobbyGroup {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    sequence: sequence || randomId,
    stage: stage || genStage({}),
    stageId: stageId || randomId,
    roundsPlayed: roundsPlayed || randomId,
    lobbies: [],
    ...BaseProps(),
  };
}
