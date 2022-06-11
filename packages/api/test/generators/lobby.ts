import { Lobby } from "../../src/lobbies/lobby.entity";
import { tournament as genTournament } from "./tournament";
import { stage as genStage } from "./stage";

type LobbyGeneratorParams = Partial<Lobby>;

export function lobby({
  id,
  name,
  playersResults,
  roundCount,
  rounds,
  sequence,
  stage,
  stageId,
  tournament,
  tournamentId,
}: LobbyGeneratorParams): Lobby {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    name: name || "",
    playersResults: playersResults || [],
    roundCount: roundCount || randomId,
    rounds: rounds || [],
    sequence: sequence || randomId,
    stage: stage || genStage({}),
    stageId: stageId || randomId,
    tournament: tournament || genTournament({}),
    tournamentId: tournamentId || randomId,
  };
}
