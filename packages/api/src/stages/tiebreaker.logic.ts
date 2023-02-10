import { SortingMethods } from "../round-results/round-result.logic";
import { Tiebreaker } from "./tiebreaker.entity";

const tiebreakerMap: { [key in SortingMethods]: Tiebreaker } = {
  [SortingMethods.POINTS]: {
    id: 0,
    description: "Most points",
  },
  [SortingMethods.TOP_FOURS]: {
    id: 1,
    description: "Most top fours",
  },
  [SortingMethods.RECENT_HIGHEST_PLACEMENT]: {
    id: 2,
    description: "Recent highest placement (going back until finding)",
  },
  [SortingMethods.AVERAGE_POSITION]: {
    id: 3,
    description: "Average position",
  },
  [SortingMethods.LESS_TOP_EIGTH]: {
    id: 4,
    description: "Less top eights",
  },
  [SortingMethods.FIRST_PLACES]: {
    id: 5,
    description: "Most first places",
  },
  [SortingMethods.LAST_ROUND_FIRST_PLACE]: {
    id: 6,
    description: "First place in last round (for checkmate finals)",
  },
  [SortingMethods.LAST_ROUND_POSITION]: {
    id: 7,
    description: "Last round position",
  },
  [SortingMethods.EXTERNAL_TIEBREAKER]: {
    id: 8,
    description: "External tiebreaker (ex: seeding)",
  },
  [SortingMethods.SECOND_PLACES]: {
    id: 9,
    description: "Most second places",
  },
  [SortingMethods.THIRD_PLACES]: {
    id: 10,
    description: "Most third places",
  },
  [SortingMethods.TOTAL_EVENT_POINTS]: {
    id: 11,
    description: "Total event points",
  },
};

export const getAll = () => Object.values(tiebreakerMap);