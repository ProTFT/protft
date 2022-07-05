import { Lobby, PlayerLobbyResult } from "../graphql/schema";

interface LobbyGeneratorProps {
  id?: number;
  name?: string;
  sequence?: number;
  tournamentId?: number;
  stageId?: number;
  roundCount?: number;
  playersResults?: PlayerLobbyResult[];
}

export const lobby = ({
  id,
  name,
  sequence,
  tournamentId,
  stageId,
  playersResults,
}: LobbyGeneratorProps): Lobby => {
  const randomId = Math.floor(Math.random() * 99999);
  return {
    id: id || randomId,
    name: name || `Lobby ${id}`,
    sequence: sequence || randomId,
    tournamentId: tournamentId || randomId,
    stageId: stageId || randomId,
    roundCount: (playersResults && playersResults[0]?.positions.length) || 0,
    playersResults: playersResults || [],
  };
};
