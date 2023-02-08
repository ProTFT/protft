import { Round } from "../rounds/round.entity";
import { CreateLobbyGroupResults } from "./dto/create-lobby-group-result.args";
import { RoundResultsRaw } from "./dto/get-results.raw";
import { RoundResult } from "./round-result.entity";
import { PlayerResultsWithPast } from "./round-result.logic";

export function fromRawToConsolidatedRoundResults(
  rawResults: RoundResultsRaw[],
): PlayerResultsWithPast[] {
  const consolidatedResults: { [key: number]: PlayerResultsWithPast } = {};
  rawResults.forEach(
    ({
      position,
      playerId,
      name,
      region,
      country,
      points,
      extraPoints,
      tiebreakerRanking,
      id,
      slug,
    }) => {
      if (!consolidatedResults[playerId]) {
        consolidatedResults[playerId] = {
          player: {
            id: playerId,
            name,
            region,
            country,
            slug,
          },
          tiebreakerRanking,
          positions: [],
          points: [extraPoints],
          lobbyPlayerId: id,
          pastPoints: 0,
        };
      }
      if (position && points) {
        consolidatedResults[playerId].positions.push(position);
        consolidatedResults[playerId].points.push(points);
      }
    },
  );
  return Object.values(consolidatedResults);
}

export function formatLobbyGroupResults(
  results: CreateLobbyGroupResults[],
  roundsPlayed: number,
  sequence: number,
  rounds: Round[],
): RoundResult[] {
  const roundInitialIndex = sequence * roundsPlayed - (roundsPlayed - 1) - 1;
  const allRoundIds = rounds.map((r) => r.id);
  const roundsIds = allRoundIds.slice(
    roundInitialIndex,
    roundInitialIndex + roundsPlayed,
  );

  const result: RoundResult[] = results.reduce(
    (prev, { lobbyPlayerId, positions }) => [
      ...prev,
      ...positions.reduce(
        (prev, curr, index) => [
          ...prev,
          {
            lobbyPlayerId,
            position: curr,
            roundId: roundsIds[index],
          },
        ],
        [],
      ),
    ],
    [],
  );

  return result;
}

export function addPastPoints(
  formattedResults: PlayerResultsWithPast[],
  rawPastResults: RoundResultsRaw[][],
): PlayerResultsWithPast[] {
  const consolidatedPastResults = fromRawToConsolidatedRoundResults(
    rawPastResults.flat(),
  );
  return formattedResults.map((r) => ({
    ...r,
    pastPoints: consolidatedPastResults
      .find((cpr) => cpr.player.id === r.player.id)
      .points.reduce((prev, curr) => prev + curr, 0),
  }));
}
