import { Lobby } from "../graphql/schema";

interface LobbyGeneratorProps {
  id?: number;
  name?: string;
  sequence?: number;
  stageId?: number;
}

export const lobby = ({ id, name, sequence, stageId }: LobbyGeneratorProps): Lobby => {
  const randomId = Math.floor(Math.random() * 99999);
  return {
    id: id || randomId,
    name: name || `Lobby ${id}`,
    sequence: sequence || randomId,
    stageId: stageId || randomId,
    players: [],
  };
};
