import { SortingMethods } from "../round-results/round-result.logic";
import { Tiebreaker } from "./tiebreaker.entity";

export const tiebreakerMap: { [key in SortingMethods]: Tiebreaker } = {
  [SortingMethods.POINTS]: {
    id: 0,
    description: "Most points",
    order: 1,
  },
  [SortingMethods.FIRST_PLACES]: {
    id: 5,
    description: "Most first places",
    order: 2,
  },
  [SortingMethods.TOP_FOURS]: {
    id: 1,
    description: "Most top fours",
    order: 3,
  },
  [SortingMethods.LESS_TOP_EIGTH]: {
    id: 4,
    description: "Less top eights",
    order: 4,
  },
  [SortingMethods.LAST_ROUND_POSITION]: {
    id: 7,
    description: "Last round position",
    order: 5,
  },
  [SortingMethods.RECENT_HIGHEST_PLACEMENT]: {
    id: 2,
    description: "Recent placements (going back until finding)",
    order: 6,
  },
  [SortingMethods.EXTERNAL_TIEBREAKER]: {
    id: 8,
    description: "External tiebreaker (ex: seeding)",
    order: 7,
  },
  [SortingMethods.LAST_ROUND_FIRST_PLACE]: {
    id: 6,
    description: "First place in last round (for checkmate finals)",
    order: 8,
  },
  [SortingMethods.SECOND_PLACES]: {
    id: 9,
    description: "Most second places",
    order: 9,
  },
  [SortingMethods.THIRD_PLACES]: {
    id: 10,
    description: "Most third places",
    order: 10,
  },
  [SortingMethods.FOURTH_PLACES]: {
    id: 12,
    description: "Most fourth places",
    order: 11,
  },
  [SortingMethods.FIFTH_PLACES]: {
    id: 13,
    description: "Most fifth places",
    order: 12,
  },
  [SortingMethods.SIXTH_PLACES]: {
    id: 14,
    description: "Most sixth places",
    order: 13,
  },
  [SortingMethods.SEVENTH_PLACES]: {
    id: 15,
    description: "Most seventh places",
    order: 14,
  },
  [SortingMethods.AVERAGE_POSITION]: {
    id: 3,
    description: "Average position",
    order: 15,
  },
  [SortingMethods.TOP_TWOS]: {
    id: 17,
    description: "Most Top 2",
    order: 16,
  },
  [SortingMethods.TOP_THREES]: {
    id: 16,
    description: "Most Top 3",
    order: 17,
  },
  [SortingMethods.TOTAL_EVENT_POINTS]: {
    id: 11,
    description: "Total event points",
    order: 18,
  },
  [SortingMethods.TOTAL_EVENT_AVG_POS]: {
    id: 18,
    description: "Total Event Average Position",
    order: 19,
  },
  [SortingMethods.TOTAL_EVENT_FIRST_PLACE]: {
    id: 19,
    description: "Total Event First Position",
    order: 20,
  },
  [SortingMethods.TOTAL_EVENT_TOP_FOUR]: {
    id: 21,
    description: "Total Event Top Four",
    order: 21,
  },
  [SortingMethods.TOTAL_EVENT_LESS_TOP_EIGTH]: {
    id: 22,
    description: "Total Event Less Top Eigth",
    order: 22,
  },
  [SortingMethods.TOTAL_EVENT_SECOND_PLACE]: {
    id: 20,
    description: "Total Event Second Position",
    order: 24,
  },
  [SortingMethods.TOTAL_EVENT_THIRD_PLACE]: {
    id: 24,
    description: "Total Event Third Position",
    order: 24,
  },
  [SortingMethods.TOTAL_EVENT_FOURTH_PLACE]: {
    id: 25,
    description: "Total Event Fourth Position",
    order: 25,
  },
  [SortingMethods.TOTAL_EVENT_FIFTH_PLACE]: {
    id: 26,
    description: "Total Event Fifth Position",
    order: 26,
  },
  [SortingMethods.TOTAL_EVENT_SIXTH_PLACE]: {
    id: 27,
    description: "Total Event Sixth Position",
    order: 27,
  },
  [SortingMethods.TOTAL_EVENT_SEVENTH_PLACE]: {
    id: 28,
    description: "Total Event Seventh Position",
    order: 28,
  },
  [SortingMethods.DIRECT_COMBAT]: {
    id: 23,
    description: "Direct Combat",
    order: 29,
  },
  [SortingMethods.TOP_FOURS_PLUS_FIRST]: {
    id: 29,
    description: "Most top fours + first places",
    order: 30,
  },
  [SortingMethods.TOTAL_EVENT_TOP_FOURS_PLUS_FIRST]: {
    id: 30,
    description: "Total Event Most top fours + first places",
    order: 31,
  },
};

export const getAll = () =>
  Object.values(tiebreakerMap).sort((a, b) => a.order - b.order);
