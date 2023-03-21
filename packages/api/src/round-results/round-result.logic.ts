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
  FOURTH_PLACES = 12,
  FIFTH_PLACES = 13,
  SIXTH_PLACES = 14,
  SEVENTH_PLACES = 15,
  TOP_THREES = 16,
  TOP_TWOS = 17,
  TOTAL_EVENT_AVG_POS = 18,
  TOTAL_EVENT_FIRST_PLACE = 19,
  TOTAL_EVENT_SECOND_PLACE = 20,
}

export const SortingMethodsNeedPastResults = [
  SortingMethods.TOTAL_EVENT_POINTS,
  SortingMethods.TOTAL_EVENT_AVG_POS,
  SortingMethods.TOTAL_EVENT_FIRST_PLACE,
  SortingMethods.TOTAL_EVENT_SECOND_PLACE,
];

// b - a, if MORE = highest position
// a - b, if LESS = highest position
export const sortByPoints = (a: PlayerResults, b: PlayerResults) =>
  b.points.reduce((prev, curr) => prev + curr, 0) -
  a.points.reduce((prev, curr) => prev + curr, 0);

export const sortByTopFour = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p <= 4).length -
  a.positions.filter((p) => p <= 4).length;

export const sortByTopThree = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p <= 3).length -
  a.positions.filter((p) => p <= 3).length;

export const sortByTopTwo = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p <= 2).length -
  a.positions.filter((p) => p <= 2).length;

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
  a.positions.reduce((prev, curr) => prev + curr, 0) /
    (a.positions.length || 1) -
  b.positions.reduce((prev, curr) => prev + curr, 0) /
    (b.positions.length || 1);

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

export const sortByFourthPlaces = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p === 4).length -
  a.positions.filter((p) => p === 4).length;

export const sortByFifthPlaces = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p === 5).length -
  a.positions.filter((p) => p === 5).length;

export const sortBySixthPlaces = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p === 6).length -
  a.positions.filter((p) => p === 6).length;

export const sortBySeventhPlaces = (a: PlayerResults, b: PlayerResults) =>
  b.positions.filter((p) => p === 7).length -
  a.positions.filter((p) => p === 7).length;

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

export const sortByTotalEventAveragePosition = (
  a: PlayerResultsWithPast,
  b: PlayerResultsWithPast,
) => {
  const aWithAllPositions = {
    ...a,
    positions: [...a.pastPositions, ...a.positions],
  };
  const bWithAllPositions = {
    ...b,
    positions: [...b.pastPositions, ...b.positions],
  };
  return sortByAveragePosition(aWithAllPositions, bWithAllPositions);
};

export const sortByTotalEventFirstPosition = (
  a: PlayerResultsWithPast,
  b: PlayerResultsWithPast,
) => {
  const aWithAllPositions = {
    ...a,
    positions: [...a.pastPositions, ...a.positions],
  };
  const bWithAllPositions = {
    ...b,
    positions: [...b.pastPositions, ...b.positions],
  };
  return sortByFirstPlaces(aWithAllPositions, bWithAllPositions);
};

export const sortByTotalEventSecondPosition = (
  a: PlayerResultsWithPast,
  b: PlayerResultsWithPast,
) => {
  const aWithAllPositions = {
    ...a,
    positions: [...a.pastPositions, ...a.positions],
  };
  const bWithAllPositions = {
    ...b,
    positions: [...b.pastPositions, ...b.positions],
  };
  return sortBySecondPlaces(aWithAllPositions, bWithAllPositions);
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
  [SortingMethods.FOURTH_PLACES]: sortByFourthPlaces,
  [SortingMethods.FIFTH_PLACES]: sortByFifthPlaces,
  [SortingMethods.SIXTH_PLACES]: sortBySixthPlaces,
  [SortingMethods.SEVENTH_PLACES]: sortBySeventhPlaces,
  [SortingMethods.TOP_THREES]: sortByTopThree,
  [SortingMethods.TOP_TWOS]: sortByTopTwo,
  [SortingMethods.TOTAL_EVENT_AVG_POS]: sortByTotalEventAveragePosition,
  [SortingMethods.TOTAL_EVENT_FIRST_PLACE]: sortByTotalEventFirstPosition,
  [SortingMethods.TOTAL_EVENT_SECOND_PLACE]: sortByTotalEventSecondPosition,
};

export interface PlayerResultsWithPast extends PlayerResults {
  pastPoints: number;
  pastPositions: number[];
}

export const sortResults = (
  results: PlayerResultsWithPast[],
  sortMethodIds: number[],
) => {
  const tiebreakers = sortMethodIds?.length
    ? sortMethodIds
    : [SortingMethods.POINTS];
  const sortMethods = tiebreakers.map((id) => sortingMethods[id]);
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
