import { snakeSeed } from "./snake-seed";

const generatePlayers = (quantity: number) => {
  return new Array(quantity).fill({}).map((_, index) => ({
    id: index + 1,
    ranking: index + 1,
  }));
};

describe("Snake Seed", () => {
  describe("4 lobbies", () => {
    it("should do the serpentine seeding", () => {
      const players = generatePlayers(32);
      const result = snakeSeed(players);

      expect(result[0]).toStrictEqual([1, 8, 9, 16, 17, 24, 25, 32]);
      expect(result[1]).toStrictEqual([2, 7, 10, 15, 18, 23, 26, 31]);
      expect(result[2]).toStrictEqual([3, 6, 11, 14, 19, 22, 27, 30]);
      expect(result[3]).toStrictEqual([4, 5, 12, 13, 20, 21, 28, 29]);
    });
  });

  describe("5 lobbies", () => {
    it("should do the serpentine seeding", () => {
      const players = generatePlayers(24);
      const result = snakeSeed(players);

      expect(result[0]).toStrictEqual([1, 6, 7, 12, 13, 18, 19, 24]);
      expect(result[1]).toStrictEqual([2, 5, 8, 11, 14, 17, 20, 23]);
      expect(result[2]).toStrictEqual([3, 4, 9, 10, 15, 16, 21, 22]);
    });
  });

  describe("8 lobbies", () => {
    it("should do the serpentine seeding", () => {
      const players = generatePlayers(64);
      const result = snakeSeed(players);

      expect(result[0]).toStrictEqual([1, 16, 17, 32, 33, 48, 49, 64]);
      expect(result[1]).toStrictEqual([2, 15, 18, 31, 34, 47, 50, 63]);
      expect(result[2]).toStrictEqual([3, 14, 19, 30, 35, 46, 51, 62]);
      expect(result[3]).toStrictEqual([4, 13, 20, 29, 36, 45, 52, 61]);
      expect(result[4]).toStrictEqual([5, 12, 21, 28, 37, 44, 53, 60]);
      expect(result[5]).toStrictEqual([6, 11, 22, 27, 38, 43, 54, 59]);
      expect(result[6]).toStrictEqual([7, 10, 23, 26, 39, 42, 55, 58]);
      expect(result[7]).toStrictEqual([8, 9, 24, 25, 40, 41, 56, 57]);
    });
  });
});
