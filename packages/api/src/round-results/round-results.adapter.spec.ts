import { inputRoundResults } from "../../test/data/input-round-results";
import { rawRoundResults } from "../../test/data/raw-round-results";
import { PlayerResults } from "./dto/get-results.out";
import {
  formatResults,
  fromRawToConsolidatedRoundResults,
} from "./round-result.adapter";

const consolidatedResults: PlayerResults[] = [
  {
    player: {
      id: 1,
      name: "Heim",
      region: "BR",
      country: "Brazil",
    },
    positions: [1, 2],
    points: [8, 7],
  },
  {
    player: {
      id: 2,
      name: "Mortdog",
      region: "NA",
      country: "USA",
    },
    positions: [2, 1],
    points: [7, 8],
  },
];

const formattedResults = [
  { lobbyId: 1, playerId: 1, roundId: 1, position: 1 },
  { lobbyId: 1, playerId: 1, roundId: 2, position: 2 },
  { lobbyId: 1, playerId: 1, roundId: 3, position: 3 },
  { lobbyId: 1, playerId: 1, roundId: 4, position: 4 },
  { lobbyId: 1, playerId: 2, roundId: 1, position: 4 },
  { lobbyId: 1, playerId: 2, roundId: 2, position: 3 },
  { lobbyId: 1, playerId: 2, roundId: 3, position: 2 },
  { lobbyId: 1, playerId: 2, roundId: 4, position: 1 },
];

describe("Round Results Adapter", () => {
  describe("consolidate round results", () => {
    it("should consolidate results based on playerId", () => {
      expect(fromRawToConsolidatedRoundResults(rawRoundResults)).toStrictEqual(
        consolidatedResults,
      );
    });
  });

  describe("format input results", () => {
    it("should format input to database model", () => {
      expect(formatResults(inputRoundResults)).toStrictEqual(formattedResults);
    });
  });
});
