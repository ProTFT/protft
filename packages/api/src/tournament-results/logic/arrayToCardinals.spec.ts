import { arrayToCardinals } from "./arrayToCardinals";

describe("array to cardinals", () => {
  describe("linear ranking", () => {
    it("should provide ordinals to simple list", () => {
      const ranking = [[10], [9], [8], [7], [6]];
      expect(arrayToCardinals(ranking)).toStrictEqual([
        { id: 10, finalPosition: "1st" },
        { id: 9, finalPosition: "2nd" },
        { id: 8, finalPosition: "3rd" },
        { id: 7, finalPosition: "4th" },
        { id: 6, finalPosition: "5th" },
      ]);
    });

    it("should accept an offset to rankings", () => {
      const ranking = [[10], [9], [8], [7], [6]];
      const offset = 8;
      expect(arrayToCardinals(ranking, offset)).toStrictEqual([
        { id: 10, finalPosition: "9th" },
        { id: 9, finalPosition: "10th" },
        { id: 8, finalPosition: "11th" },
        { id: 7, finalPosition: "12th" },
        { id: 6, finalPosition: "13th" },
      ]);
    });
  });

  describe("composite ranking", () => {
    it("should provide ordinals to two players on same position", () => {
      const ranking = [
        [10, 1],
        [9, 2],
        [8, 3],
        [7, 4],
        [6, 5],
      ];
      expect(arrayToCardinals(ranking)).toStrictEqual([
        { id: 10, finalPosition: "1st-2nd" },
        { id: 1, finalPosition: "1st-2nd" },
        { id: 9, finalPosition: "3rd-4th" },
        { id: 2, finalPosition: "3rd-4th" },
        { id: 8, finalPosition: "5th-6th" },
        { id: 3, finalPosition: "5th-6th" },
        { id: 7, finalPosition: "7th-8th" },
        { id: 4, finalPosition: "7th-8th" },
        { id: 6, finalPosition: "9th-10th" },
        { id: 5, finalPosition: "9th-10th" },
      ]);
    });

    it("should provide ordinals to different number of players between positions", () => {
      const ranking = [[10, 1, 11], [9, 2], [8, 3, 12], [7], [6, 5]];
      expect(arrayToCardinals(ranking)).toStrictEqual([
        { id: 10, finalPosition: "1st-3rd" },
        { id: 1, finalPosition: "1st-3rd" },
        { id: 11, finalPosition: "1st-3rd" },
        { id: 9, finalPosition: "4th-5th" },
        { id: 2, finalPosition: "4th-5th" },
        { id: 8, finalPosition: "6th-8th" },
        { id: 3, finalPosition: "6th-8th" },
        { id: 12, finalPosition: "6th-8th" },
        { id: 7, finalPosition: "9th" },
        { id: 6, finalPosition: "10th-11th" },
        { id: 5, finalPosition: "10th-11th" },
      ]);
    });
  });
});
