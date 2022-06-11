import { RawRoundResults } from "./lobbies.service";
import { PlayerLobbyResult } from "./lobby.entity";

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
