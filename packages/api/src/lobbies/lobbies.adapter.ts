import { CreateLobbyResultArgs } from "./dto/create-lobby-result.args";
import { RawRoundResults } from "./lobbies.service";
import { PlayerLobbyResult } from "./lobby.entity";
import { RoundResult } from "./round-result.entity";

export function formatResults({
  players,
  lobbyId,
}: CreateLobbyResultArgs): RoundResult[] {
  // tentar fazer um reduce aqui?
  const positionInputs = [];
  players.forEach(({ playerId, positions }) => {
    positions.forEach(({ roundId, position }) => {
      positionInputs.push({
        lobbyId,
        playerId,
        position,
        roundId,
      });
    });
  });
  return positionInputs;
}

export function fromRawToConsolidatedRoundResults(
  rawResults: RawRoundResults[],
): PlayerLobbyResult[] {
  const consolidatedResults: { [key: number]: PlayerLobbyResult } = {};

  rawResults.forEach(
    ({ position, playerId, name, region, country, points }) => {
      if (!consolidatedResults[playerId]) {
        consolidatedResults[playerId] = {
          player: {
            id: playerId,
            name,
            region,
            country,
          },
          positions: [],
          points: [],
        };
      }
      consolidatedResults[playerId].positions.push(position);
      consolidatedResults[playerId].points.push(points);
    },
  );
  return Object.values(consolidatedResults);
}
