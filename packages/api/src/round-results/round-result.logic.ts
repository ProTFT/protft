import { PlayerResults } from "./dto/get-results.out";

export enum SortingMethods {
  POINTS = 0,
  TOP_FOURS = 1,
  RECENT_HIGHEST_PLACEMENT = 2,
  AVERAGE_POSITION = 3,
  LESS_TOP_EIGTH = 4,
  FIRST_PLACES = 5,
  LAST_ROUND_FIRST_PLACE = 6,
  LAST_ROUND_POSITION = 7,
  EXTERNAL_TIEBREAKER = 8,
  SECOND_PLACES = 9,
  THIRD_PLACES = 10,
  TOTAL_EVENT_POINTS = 11,
}

// b - a, if MORE = highest position
// a - b, if LESS = highest position
export const sortByPoints = (a: PlayerResults, b: PlayerResults) =>
  b.points.reduce((prev, curr) => prev + curr, 0) -
  a.points.reduce((prev, curr) => prev + curr, 0);

export const sortByTopFour = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p <= 4).length -
  a.positions.filter((p) => p <= 4).length;

export const sortByRecentHighestPlacement = (
  a: PlayerResults,
  b: PlayerResults,
): number => {
  for (let i = a.positions.length - 1; i >= 0; i--) {
    const result = a.positions[i] - b.positions[i];
    if (result != 0) {
      return result;
    }
  }
  return 0;
};

export const sortByAveragePosition = (a: PlayerResults, b: PlayerResults) =>
  a.positions.reduce((prev, curr) => prev + curr) / (b.positions.length || 1) -
  b.positions.reduce((prev, curr) => prev + curr) / (a.positions.length || 1);

export const sortByLessTopEigth = (a: PlayerResults, b: PlayerResults) =>
  a.positions.filter((p) => p === 8).length -
  b.positions.filter((p) => p === 8).length;

export const sortByFirstPlaces = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p === 1).length -
  a.positions.filter((p) => p === 1).length;

export const sortBySecondPlaces = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p === 2).length -
  a.positions.filter((p) => p === 2).length;

export const sortByThirdPlaces = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p === 3).length -
  a.positions.filter((p) => p === 3).length;

export const sortByLastRoundFirstPlace = (
  a: PlayerResults,
  b: PlayerResults,
) => {
  if (a.positions[a.positions.length - 1] === 1) return -1;
  if (b.positions[b.positions.length - 1] === 1) return 1;
  return 0;
};

export const sortByLastRoundPosition = (a: PlayerResults, b: PlayerResults) =>
  a.positions[a.positions.length - 1] - b.positions[b.positions.length - 1];

export const sortByExternalTiebreaker = (a: PlayerResults, b: PlayerResults) =>
  a.tiebreakerRanking - b.tiebreakerRanking;

export const sortByTotalEventPoints = (
  a: PlayerResultsWithPast,
  b: PlayerResultsWithPast,
) => {
  const bStagePoints = b.points.reduce((prev, curr) => prev + curr, 0);
  const aStagePoints = a.points.reduce((prev, curr) => prev + curr, 0);
  return b.pastPoints + bStagePoints - (a.pastPoints + aStagePoints);
};

interface PastPoints {
  a: number;
  b: number;
}

export const sortingMethods: {
  [key in SortingMethods]: (
    a: PlayerResults,
    b: PlayerResults,
    pastPoints?: PastPoints,
  ) => number;
} = {
  [SortingMethods.POINTS]: sortByPoints,
  [SortingMethods.TOP_FOURS]: sortByTopFour,
  [SortingMethods.RECENT_HIGHEST_PLACEMENT]: sortByRecentHighestPlacement,
  [SortingMethods.AVERAGE_POSITION]: sortByAveragePosition,
  [SortingMethods.LESS_TOP_EIGTH]: sortByLessTopEigth,
  [SortingMethods.FIRST_PLACES]: sortByFirstPlaces,
  [SortingMethods.LAST_ROUND_FIRST_PLACE]: sortByLastRoundFirstPlace,
  [SortingMethods.LAST_ROUND_POSITION]: sortByLastRoundPosition,
  [SortingMethods.EXTERNAL_TIEBREAKER]: sortByExternalTiebreaker,
  [SortingMethods.SECOND_PLACES]: sortBySecondPlaces,
  [SortingMethods.THIRD_PLACES]: sortByThirdPlaces,
  [SortingMethods.TOTAL_EVENT_POINTS]: sortByTotalEventPoints,
};

export interface PlayerResultsWithPast extends PlayerResults {
  pastPoints: number;
}

export const sortResults = (
  results: PlayerResultsWithPast[],
  sortMethodIds: number[],
) => {
  const sortMethods = (sortMethodIds || [SortingMethods.POINTS]).map(
    (id) => sortingMethods[id],
  );
  const sortedResults = [...results].sort((a, b) => {
    for (const sortMethod of sortMethods) {
      const result = sortMethod(a, b);
      if (result !== 0) {
        return result;
      }
    }
  });
  return sortedResults;
};
