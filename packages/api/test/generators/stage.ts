import { Stage, StageType } from "../../src/stages/stage.entity";
import { tournament as genTournament } from "./tournament";

export function stage({
  id,
  name,
  isFinal,
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
}: Partial<Stage>): Stage {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    name: name || "",
    isFinal: isFinal || false,
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
  };
}
