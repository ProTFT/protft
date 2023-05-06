import {
  generatePlayer,
  generatePlayerWithPastResults,
} from "../../test/data/result-tiebreakers";
import {
  sortByAveragePosition,
  sortByDirectCombat,
  sortByExternalTiebreaker,
  sortByFifthPlaces,
  sortByFirstPlaces,
  sortByFourthPlaces,
  sortByLastRoundFirstPlace,
  sortByLastRoundPosition,
  sortByLessTopEigth,
  sortByPoints,
  sortByRecentHighestPlacement,
  sortBySecondPlaces,
  sortBySeventhPlaces,
  sortBySixthPlaces,
  sortByThirdPlaces,
  sortByTopFour,
  sortByTopThree,
  sortByTopTwo,
  sortByTotalEventAveragePosition,
  sortByTotalEventFirstPosition,
  sortByTotalEventLessTopEigth,
  sortByTotalEventPoints,
  sortByTotalEventSecondPosition,
  sortByTotalEventTopFour,
  SortingMethods,
  sortResults,
} from "./round-result.logic";

describe("Sorting with tie breakers", () => {
  describe("sort by points", () => {
    const playerTopEigth = generatePlayer([8, 8, 8, 8]);
    const playerTopOne = generatePlayer([1, 1, 1, 1]);

    it("should be negative if a has higher placement than b", () => {
      expect(sortByPoints(playerTopOne, playerTopEigth)).toBeLessThan(0);
    });
    it("should be positive if b has higher placement than a", () => {
      expect(sortByPoints(playerTopEigth, playerTopOne)).toBeGreaterThan(0);
    });
    it("should be zero if a = b", () => {
      expect(sortByPoints(playerTopOne, playerTopOne)).toBe(0);
    });
  });

  describe("sort by top four", () => {
    const playerWithThreeTopFours = generatePlayer([1, 2, 3, 5, 5]);
    const playerWithTwoTopFours = generatePlayer([1, 2, 5, 6, 7]);
    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByTopFour(playerWithThreeTopFours, playerWithTwoTopFours),
      ).toBeLessThan(0);
    });
    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByTopFour(playerWithTwoTopFours, playerWithThreeTopFours),
      ).toBeGreaterThan(0);
    });
    it("should be zero if a = b", () => {
      expect(
        sortByPoints(playerWithThreeTopFours, playerWithThreeTopFours),
      ).toBe(0);
    });
  });

  describe("sort by top three", () => {
    const playerWithThreeTopThrees = generatePlayer([1, 2, 3, 5, 5]);
    const playerWithTwoTopThrees = generatePlayer([1, 2, 5, 6, 7]);
    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByTopThree(playerWithThreeTopThrees, playerWithTwoTopThrees),
      ).toBeLessThan(0);
    });
    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByTopThree(playerWithTwoTopThrees, playerWithThreeTopThrees),
      ).toBeGreaterThan(0);
    });
    it("should be zero if a = b", () => {
      expect(
        sortByTopThree(playerWithThreeTopThrees, playerWithThreeTopThrees),
      ).toBe(0);
    });
  });

  describe("sort by top two", () => {
    const playerWithThreeTopTwos = generatePlayer([1, 2, 2, 5, 5]);
    const playerWithTwoTopTwos = generatePlayer([1, 2, 5, 6, 7]);
    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByTopTwo(playerWithThreeTopTwos, playerWithTwoTopTwos),
      ).toBeLessThan(0);
    });
    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByTopTwo(playerWithTwoTopTwos, playerWithThreeTopTwos),
      ).toBeGreaterThan(0);
    });
    it("should be zero if a = b", () => {
      expect(sortByTopTwo(playerWithThreeTopTwos, playerWithThreeTopTwos)).toBe(
        0,
      );
    });
  });

  describe("sort by highest recent placement", () => {
    const playerWithEqualResults = generatePlayer([1, 1, 1]);
    const playerWithFirstInLastGame = generatePlayer([8, 8, 1]);
    const playerWithFirstInFirstGame = generatePlayer([1, 8, 8]);
    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByRecentHighestPlacement(
          playerWithFirstInLastGame,
          playerWithFirstInFirstGame,
        ),
      ).toBeLessThan(0);
    });
    it("should be zero if a = b", () => {
      expect(
        sortByRecentHighestPlacement(
          playerWithEqualResults,
          playerWithEqualResults,
        ),
      ).toBe(0);
    });
    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByRecentHighestPlacement(
          playerWithFirstInFirstGame,
          playerWithFirstInLastGame,
        ),
      ).toBeGreaterThan(0);
    });
  });

  describe("sort by average position", () => {
    const highAveragePlayer = generatePlayer([1, 2, 3, 4]);
    const highAvgInvertedPlayer = generatePlayer([4, 3, 2, 1]);
    const slightlyLowerAveragePlayer = generatePlayer([1, 2, 3, 5]);
    const emptyPlayer = generatePlayer([]);
    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByAveragePosition(highAveragePlayer, slightlyLowerAveragePlayer),
      ).toBeLessThan(0);
    });
    it("should be zero if a = b", () => {
      expect(
        sortByAveragePosition(highAvgInvertedPlayer, highAveragePlayer),
      ).toBe(0);
    });
    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByAveragePosition(slightlyLowerAveragePlayer, highAveragePlayer),
      ).toBeGreaterThan(0);
    });
    it("should not explode if user has no positions yet", () => {
      expect(sortByAveragePosition(emptyPlayer, emptyPlayer)).toBe(0);
    });
  });

  describe("sort by less top eigth", () => {
    const oneTop8Player = generatePlayer([1, 1, 8]);
    const twoTop8Player = generatePlayer([2, 8, 8]);
    const noTop8Player = generatePlayer([2, 3, 4]);

    it("should be negative if a has higher placement than b", () => {
      expect(sortByLessTopEigth(noTop8Player, twoTop8Player)).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(sortByLessTopEigth(oneTop8Player, noTop8Player)).toBeGreaterThan(
        0,
      );
    });

    it("should be zero if a = b", () => {
      expect(sortByLessTopEigth(twoTop8Player, twoTop8Player)).toBe(0);
    });
  });

  describe("sort by most top one", () => {
    const twoTop1Player = generatePlayer([1, 1, 8]);
    const oneTop1Player = generatePlayer([1, 8, 8]);
    const noTop1Player = generatePlayer([2, 3, 4]);

    it("should be negative if a has higher placement than b", () => {
      expect(sortByFirstPlaces(twoTop1Player, noTop1Player)).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(sortByFirstPlaces(noTop1Player, oneTop1Player)).toBeGreaterThan(0);
    });

    it("should be zero if a = b", () => {
      expect(sortByFirstPlaces(twoTop1Player, twoTop1Player)).toBe(0);
    });
  });

  describe("sort by most second places", () => {
    const twoTop2Player = generatePlayer([2, 2, 8]);
    const oneTop2Player = generatePlayer([2, 8, 8]);
    const noTop2Player = generatePlayer([3, 3, 4]);

    it("should be negative if a has higher placement than b", () => {
      expect(sortBySecondPlaces(twoTop2Player, noTop2Player)).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(sortBySecondPlaces(noTop2Player, oneTop2Player)).toBeGreaterThan(
        0,
      );
    });

    it("should be zero if a = b", () => {
      expect(sortBySecondPlaces(twoTop2Player, twoTop2Player)).toBe(0);
    });
  });

  describe("sort by most third places", () => {
    const twoTop3Player = generatePlayer([3, 3, 8]);
    const oneTop3Player = generatePlayer([3, 8, 8]);
    const noTop3Player = generatePlayer([4, 4, 4]);

    it("should be negative if a has higher placement than b", () => {
      expect(sortByThirdPlaces(twoTop3Player, noTop3Player)).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(sortByThirdPlaces(noTop3Player, oneTop3Player)).toBeGreaterThan(0);
    });

    it("should be zero if a = b", () => {
      expect(sortByThirdPlaces(twoTop3Player, twoTop3Player)).toBe(0);
    });
  });

  describe("sort by most fourth places", () => {
    const twoFourthsPlayer = generatePlayer([4, 4, 8]);
    const oneFourthPlayer = generatePlayer([4, 8, 8]);
    const noFourthsPlayer = generatePlayer([5, 5, 5]);

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByFourthPlaces(twoFourthsPlayer, noFourthsPlayer),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByFourthPlaces(noFourthsPlayer, oneFourthPlayer),
      ).toBeGreaterThan(0);
    });

    it("should be zero if a = b", () => {
      expect(sortByFourthPlaces(twoFourthsPlayer, twoFourthsPlayer)).toBe(0);
    });
  });

  describe("sort by most fifth places", () => {
    const twoFifthsPlayer = generatePlayer([5, 5, 8]);
    const oneFifthPlayer = generatePlayer([5, 8, 8]);
    const noFifthsPlayer = generatePlayer([6, 6, 6]);

    it("should be negative if a has higher placement than b", () => {
      expect(sortByFifthPlaces(twoFifthsPlayer, noFifthsPlayer)).toBeLessThan(
        0,
      );
    });

    it("should be positive if b has higher placement than a", () => {
      expect(sortByFifthPlaces(noFifthsPlayer, oneFifthPlayer)).toBeGreaterThan(
        0,
      );
    });

    it("should be zero if a = b", () => {
      expect(sortByFifthPlaces(twoFifthsPlayer, twoFifthsPlayer)).toBe(0);
    });
  });

  describe("sort by most sixth places", () => {
    const twoSixthsPlayer = generatePlayer([6, 6, 8]);
    const oneSixthPlayer = generatePlayer([6, 8, 8]);
    const noSixthsPlayer = generatePlayer([7, 7, 7]);

    it("should be negative if a has higher placement than b", () => {
      expect(sortBySixthPlaces(twoSixthsPlayer, noSixthsPlayer)).toBeLessThan(
        0,
      );
    });

    it("should be positive if b has higher placement than a", () => {
      expect(sortBySixthPlaces(noSixthsPlayer, oneSixthPlayer)).toBeGreaterThan(
        0,
      );
    });

    it("should be zero if a = b", () => {
      expect(sortBySixthPlaces(twoSixthsPlayer, twoSixthsPlayer)).toBe(0);
    });
  });

  describe("sort by most seventh places", () => {
    const twoSeventhsPlayer = generatePlayer([7, 7, 8]);
    const oneSeventhPlayer = generatePlayer([7, 8, 8]);
    const noSeventhsPlayer = generatePlayer([8, 8, 8]);

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortBySeventhPlaces(twoSeventhsPlayer, noSeventhsPlayer),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortBySeventhPlaces(noSeventhsPlayer, oneSeventhPlayer),
      ).toBeGreaterThan(0);
    });

    it("should be zero if a = b", () => {
      expect(sortBySeventhPlaces(twoSeventhsPlayer, twoSeventhsPlayer)).toBe(0);
    });
  });

  describe("sort by last round top one", () => {
    const championPlayer = generatePlayer([3, 2, 1]);
    const middleRoundTop1Player = generatePlayer([3, 1, 2]);
    const noTop1Player = generatePlayer([2, 3, 4]);

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByLastRoundFirstPlace(championPlayer, noTop1Player),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByLastRoundFirstPlace(middleRoundTop1Player, championPlayer),
      ).toBeGreaterThan(0);
    });

    it("should be zero if none of the players got top 1 last round", () => {
      expect(
        sortByLastRoundFirstPlace(middleRoundTop1Player, noTop1Player),
      ).toBe(0);
    });
  });

  describe("sort by last round position", () => {
    const lastRoundWinner = generatePlayer([8, 8, 1]);
    const lastRoundLoser = generatePlayer([1, 1, 8]);
    const lastRoundMiddlePack = generatePlayer([2, 3, 4]);

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByLastRoundPosition(lastRoundWinner, lastRoundMiddlePack),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByLastRoundPosition(lastRoundLoser, lastRoundWinner),
      ).toBeGreaterThan(0);
    });

    it("should be zero if both players had the same position", () => {
      expect(
        sortByLastRoundPosition(lastRoundMiddlePack, lastRoundMiddlePack),
      ).toBe(0);
    });
  });

  describe("sort by external tiebreaker", () => {
    const firstOnRanking = generatePlayer([8, 8, 1], 1);
    const lastOnRanking = generatePlayer([1, 1, 8], 100);
    const middlePackRanking = generatePlayer([2, 3, 4], 50);

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByExternalTiebreaker(firstOnRanking, lastOnRanking),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByExternalTiebreaker(middlePackRanking, firstOnRanking),
      ).toBeGreaterThan(0);
    });

    it("should be zero if both players had the same position", () => {
      expect(
        sortByExternalTiebreaker(middlePackRanking, middlePackRanking),
      ).toBe(0);
    });
  });

  describe("sort by total event points", () => {
    const bestNowWorstOverall = generatePlayerWithPastResults([1, 1, 1], 0);
    const worstNowBestOverall = generatePlayerWithPastResults([8, 8, 8], 100);
    const middle = generatePlayerWithPastResults([4, 4, 4], 50);

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByTotalEventPoints(worstNowBestOverall, bestNowWorstOverall),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByTotalEventPoints(bestNowWorstOverall, middle),
      ).toBeGreaterThan(0);
    });

    it("should be zero if both players had the same position", () => {
      expect(sortByTotalEventPoints(middle, middle)).toBe(0);
    });
  });

  describe("sort by total event average position", () => {
    const bestNowWorstOverall = generatePlayerWithPastResults(
      [1, 1, 1],
      0,
      [8, 8, 8, 8, 8, 8],
    );
    const worstNowBestOverall = generatePlayerWithPastResults(
      [8, 8, 8],
      0,
      [1, 1, 1, 1, 1, 1],
    );
    const middle = generatePlayerWithPastResults(
      [4, 4, 4],
      0,
      [4, 4, 4, 4, 4, 4],
    );

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByTotalEventAveragePosition(
          worstNowBestOverall,
          bestNowWorstOverall,
        ),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByTotalEventAveragePosition(bestNowWorstOverall, middle),
      ).toBeGreaterThan(0);
    });

    it("should be zero if both players had the same position", () => {
      expect(sortByTotalEventAveragePosition(middle, middle)).toBe(0);
    });
  });

  describe("sort by total event first places", () => {
    const bestNowWorstOverall = generatePlayerWithPastResults(
      [1, 1, 1],
      0,
      [8, 8, 8, 8, 8, 8],
    );
    const worstNowBestOverall = generatePlayerWithPastResults(
      [8, 8, 8],
      0,
      [1, 1, 1, 1, 1, 1],
    );
    const middle = generatePlayerWithPastResults(
      [1, 1, 4],
      0,
      [1, 1, 4, 4, 4, 4],
    );

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByTotalEventFirstPosition(worstNowBestOverall, bestNowWorstOverall),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByTotalEventFirstPosition(bestNowWorstOverall, middle),
      ).toBeGreaterThan(0);
    });

    it("should be zero if both players had the same position", () => {
      expect(sortByTotalEventFirstPosition(middle, middle)).toBe(0);
    });
  });

  describe("sort by total event second places", () => {
    const bestNowWorstOverall = generatePlayerWithPastResults(
      [2, 2, 2],
      0,
      [8, 8, 8, 8, 8, 8],
    );
    const worstNowBestOverall = generatePlayerWithPastResults(
      [8, 8, 8],
      0,
      [2, 2, 2, 2, 2, 2],
    );
    const middle = generatePlayerWithPastResults(
      [2, 2, 4],
      0,
      [2, 2, 4, 4, 4, 4],
    );

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByTotalEventSecondPosition(
          worstNowBestOverall,
          bestNowWorstOverall,
        ),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByTotalEventSecondPosition(bestNowWorstOverall, middle),
      ).toBeGreaterThan(0);
    });

    it("should be zero if both players had the same position", () => {
      expect(sortByTotalEventSecondPosition(middle, middle)).toBe(0);
    });
  });

  describe("sort by total event top four", () => {
    const bestNowWorstOverall = generatePlayerWithPastResults(
      [1, 2, 3],
      0,
      [8, 8, 8, 8, 8, 8],
    );
    const worstNowBestOverall = generatePlayerWithPastResults(
      [8, 8, 8],
      0,
      [1, 2, 3, 4, 1, 2],
    );
    const middle = generatePlayerWithPastResults(
      [1, 2, 6],
      0,
      [2, 2, 6, 6, 6, 6],
    );

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByTotalEventTopFour(worstNowBestOverall, bestNowWorstOverall),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByTotalEventTopFour(bestNowWorstOverall, middle),
      ).toBeGreaterThan(0);
    });

    it("should be zero if both players had the same position", () => {
      expect(sortByTotalEventTopFour(middle, middle)).toBe(0);
    });
  });

  describe("sort by total event less top 8", () => {
    const bestNowWorstOverall = generatePlayerWithPastResults(
      [1, 2, 3],
      0,
      [8, 8, 8, 8, 8, 8],
    );
    const worstNowBestOverall = generatePlayerWithPastResults(
      [8, 8, 8],
      0,
      [1, 2, 3, 4, 1, 2],
    );
    const middle = generatePlayerWithPastResults(
      [1, 2, 8],
      0,
      [8, 8, 8, 6, 6, 6],
    );

    it("should be negative if a has higher placement than b", () => {
      expect(
        sortByTotalEventLessTopEigth(worstNowBestOverall, bestNowWorstOverall),
      ).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(
        sortByTotalEventLessTopEigth(bestNowWorstOverall, middle),
      ).toBeGreaterThan(0);
    });

    it("should be zero if both players had the same position", () => {
      expect(sortByTotalEventLessTopEigth(middle, middle)).toBe(0);
    });
  });

  describe("sort by direct combat", () => {
    const best = generatePlayer([1, 8, 1]);
    const worst = generatePlayer([2, 3, 2]);

    it("should be negative if a has higher placement than b", () => {
      expect(sortByDirectCombat(best, worst)).toBeLessThan(0);
    });

    it("should be positive if b has higher placement than a", () => {
      expect(sortByDirectCombat(worst, best)).toBeGreaterThan(0);
    });

    it("should be zero if a = b", () => {
      expect(sortByDirectCombat(worst, worst)).toBe(0);
    });
  });

  describe("sort results", () => {
    const bestInPoints = generatePlayer([1, 1, 1]);
    const bestInSecondPlaces = generatePlayer([2, 2, 1]);

    it("if no tiebreakers are defined, should sort by points", () => {
      expect(sortResults([bestInSecondPlaces, bestInPoints], [])).toStrictEqual(
        [bestInPoints, bestInSecondPlaces],
      );
    });

    it("should sort by tiebreaker order", () => {
      expect(
        sortResults(
          [bestInPoints, bestInSecondPlaces],
          [SortingMethods.SECOND_PLACES],
        ),
      ).toStrictEqual([bestInSecondPlaces, bestInPoints]);
    });

    it("should continue through tiebreakers until finding", () => {
      expect(
        sortResults(
          [bestInPoints, bestInSecondPlaces],
          [SortingMethods.LAST_ROUND_POSITION, SortingMethods.SECOND_PLACES],
        ),
      ).toStrictEqual([bestInSecondPlaces, bestInPoints]);
    });
  });
});
