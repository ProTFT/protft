import { PlayerStatsRaw } from "../round-results/dto/get-player-stats.raw";
import { formatStats } from "./players.adapter";

describe("Players adapter", () => {
  describe("format stats", () => {
    it("should convert string stats to number", () => {
      const input: PlayerStatsRaw = {
        eigthCount: "1",
        topFourCount: "2",
        topOneCount: "3",
        totalGames: "24",
        averagePosition: "2.1111111",
      };
      expect(formatStats(input)).toStrictEqual({
        eigthCount: 1,
        topFourCount: 2,
        topOneCount: 3,
        totalGames: 24,
        averagePosition: 2.11,
      });
    });
  });
});
