import { Stage } from "../../src/stages/stage.entity";
import { tournament as genTournament } from "./tournament";

type StageGeneratorParams = Partial<Stage>;

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
}: StageGeneratorParams): Stage {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    name: name || "",
    isFinal: isFinal || false,
    lobbies: lobbies || [],
    pointSchema: pointSchema || { id: randomId, name: "" },
    pointSchemaId: pointSchemaId || randomId,
    sequence: sequence || randomId,
    tournament: tournament || genTournament({ id: randomId }),
    tournamentId: tournamentId || randomId,
  };
}
