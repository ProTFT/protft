import { PlayerStatsRaw } from "../round-results/dto/get-player-stats.raw";
import { formatStats } from "./players.adapter";

describe("Players adapter", () => {
  describe("format stats", () => {
    it("should convert string stats to number", () => {
      const input: PlayerStatsRaw = {
        eigthPercent: "1",
        topFourPercent: "2",
        topOnePercent: "3",
        totalGames: "24",
        averagePosition: "2.1111111",
      };
      expect(formatStats(input)).toStrictEqual({
        eigthCount: 100,
        topFourCount: 200,
        topOneCount: 300,
        totalGames: 24,
        averagePosition: 2.11,
      });
    });

    it("should default to 0 if no data is found", () => {
      const input: PlayerStatsRaw = {
        eigthPercent: "",
        topFourPercent: "",
        topOnePercent: "",
        totalGames: "",
        averagePosition: "",
      };
      expect(formatStats(input)).toStrictEqual({
        eigthCount: 0,
        topFourCount: 0,
        topOneCount: 0,
        totalGames: 0,
        averagePosition: 0,
      });
    });
  });
});
