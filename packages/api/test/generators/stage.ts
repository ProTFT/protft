import { Stage } from "../../src/stages/stage.entity";
import { StageType } from "../../src/stages/types/StageType";
import { BaseProps } from "./base-props";
import { tournament as genTournament } from "./tournament";

export function stage({
  id,
  name,
  lobbies,
  pointSchema,
  pointSchemaId,
  sequence,
  tournament,
  tournamentId,
  rounds,
  description,
  players,
  lobbyGroups,
  tiebreakers,
  stageType,
  qualifiedCount,
  startDateTime,
}: Partial<Stage>): Stage {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    name: name || "",
    lobbies: lobbies || [],
    roundCount: rounds?.length || 0,
    pointSchema: pointSchema || { id: randomId, name: "" },
    pointSchemaId: pointSchemaId || randomId,
    sequence: sequence || randomId,
    tournament: tournament || genTournament({ id: randomId }),
    tournamentId: tournamentId || randomId,
    description: description || "",
    players: players || [],
    lobbyGroups: lobbyGroups || [],
    rounds: rounds || [],
    tiebreakers: tiebreakers || [],
    stageType: stageType || StageType.RANKING,
    qualifiedCount: qualifiedCount || 0,
    startDateTime: startDateTime || "",
    ...BaseProps(),
  };
}
