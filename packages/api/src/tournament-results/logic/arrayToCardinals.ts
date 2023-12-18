import { getOrdinal } from "../../lib/Number";

interface PlayersWithCardinals {
  id: number;
  finalPosition: string;
}

export const arrayToCardinals = (
  ranking: number[][],
  offsetPosition = 0,
): PlayersWithCardinals[] => {
  let currentPosition = offsetPosition;
  return ranking.flatMap((playersInPosition) => {
    const playerQuantityInPosition = playersInPosition.length;

    if (playerQuantityInPosition === 1) {
      currentPosition += playerQuantityInPosition;
      return {
        id: playersInPosition[0],
        finalPosition: getOrdinal(currentPosition),
      };
    }

    const result: PlayersWithCardinals[] = new Array(playerQuantityInPosition)
      .fill({})
      .map((_, index) => ({
        id: playersInPosition[index],
        finalPosition: `${getOrdinal(currentPosition + 1)}-${getOrdinal(
          currentPosition + playerQuantityInPosition,
        )}`,
      }));

    currentPosition += playerQuantityInPosition;
    return result;
  });
};
