import { Lobby } from "../../src/lobbies/lobby.entity";
import { stage as genStage } from "./stage";
import { lobbyGroup as genLobbyGroup } from "./lobby-group";

export function lobby({
  id,
  name,
  sequence,
  stage,
  stageId,
  players,
  lobbyGroup,
  lobbyGroupId,
}: Partial<Lobby>): Lobby {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    name: name || "",
    sequence: sequence || randomId,
    stage: stage || genStage({}),
    stageId: stageId || randomId,
    players: players || [],
    lobbyGroupId: lobbyGroupId || randomId,
    lobbyGroup: lobbyGroup || genLobbyGroup({}),
  };
}
