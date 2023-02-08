import { rawRoundResults } from "../../test/data/raw-round-results";
import {
  addPastPoints,
  fromRawToConsolidatedRoundResults,
} from "./round-result.adapter";
import { PlayerResultsWithPast } from "./round-result.logic";

const firstPlayer = {
  name: "Heim",
  region: "BR",
  country: "Brazil",
  slug: "1-heim",
};

const secondPlayer = {
  name: "Mortdog",
  region: "NA",
  country: "USA",
  slug: "2-mortdog",
};

const consolidatedResults: PlayerResultsWithPast[] = [
  {
    player: {
      id: 1,
      ...firstPlayer,
    },
    positions: [1, 2],
    points: [0, 8, 7],
    tiebreakerRanking: 0,
    lobbyPlayerId: 1,
    pastPoints: 0,
  },
  {
    player: {
      id: 2,
      ...secondPlayer,
    },
    positions: [2, 1],
    points: [0, 7, 8],
    tiebreakerRanking: 0,
    lobbyPlayerId: 2,
    pastPoints: 0,
  },
];
describe("Round Results Adapter", () => {
  describe("consolidate round results", () => {
    it("should consolidate results based on playerId", () => {
      expect(fromRawToConsolidatedRoundResults(rawRoundResults)).toStrictEqual(
        consolidatedResults,
      );
    });
  });

  describe("add past points", () => {
    it("should add past points to results", () => {
      const response = addPastPoints(consolidatedResults, [rawRoundResults]);
      const expectedResponse = consolidatedResults.map((r) => ({
        ...r,
        pastPoints: 8 + 7,
      }));
      expect(response).toStrictEqual(expectedResponse);
    });
  });
});
