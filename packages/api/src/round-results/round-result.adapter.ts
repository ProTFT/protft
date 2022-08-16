import { CreateLobbyResultArgs } from "./dto/create-lobby-result.args";
import { PlayerResults } from "./dto/get-results.out";
import { RoundResultsRaw } from "./dto/get-results.raw";
import { RoundResult } from "./round-result.entity";

export function fromRawToConsolidatedRoundResults(
  rawResults: RoundResultsRaw[],
): PlayerResults[] {
  const consolidatedResults: { [key: number]: PlayerResults } = {};

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

export function formatResults({
  players,
  lobbyId,
}: CreateLobbyResultArgs): RoundResult[] {
  return players.reduce((prev, { playerId, positions }) => {
    return [
      ...prev,
      ...positions.reduce((prev, { roundId, position }) => {
        return [
          ...prev,
          {
            lobbyId,
            playerId,
            position,
            roundId,
          },
        ];
      }, []),
    ];
  }, []);
}
