import { Round } from "../../src/lobbies/round.entity";
import { lobby as genLobby } from "./lobby";
import { tournament as genTournament } from "./tournament";
import { stage as genStage } from "./stage";

type RoundGeneratorParams = Partial<Round>;

export function round({
  id,
  lobby,
  lobbyId,
  roundResults,
  sequence,
  stage,
  stageId,
  tournament,
  tournamentId,
}: RoundGeneratorParams): Round {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    lobby: lobby || genLobby({}),
    lobbyId: lobbyId || randomId,
    roundResults: roundResults || [],
    sequence: sequence || randomId,
    stage: stage || genStage({}),
    stageId: stageId || randomId,
    tournament: tournament || genTournament({}),
    tournamentId: tournamentId || randomId,
  };
}
