import { SelectQueryBuilder } from "typeorm";
import { Player } from "../players/player.entity";
import { createOrWhereConditions, likeNameOrAlias } from "./DBCompositeFilters";

describe("DB composite filters", () => {
  describe("orWhere", () => {
    let fakeQueryBuilder: SelectQueryBuilder<unknown>;
    beforeEach(() => {
      fakeQueryBuilder = {
        orWhere: jest.fn(),
      } as unknown as SelectQueryBuilder<unknown>;
    });

    it("should call orWhere for each condition", () => {
      const searchConditions = ["name = 1", "name = 2"];
      const resultFunction = createOrWhereConditions(searchConditions);
      resultFunction(fakeQueryBuilder);
      expect(fakeQueryBuilder.orWhere).toHaveBeenCalledTimes(
        searchConditions.length,
      );
    });
  });

  describe("likeNameOrAlias", () => {
    let fakeQueryBuilder: SelectQueryBuilder<Player>;
    beforeEach(() => {
      fakeQueryBuilder = {
        orWhere: jest.fn().mockReturnThis(),
      } as unknown as SelectQueryBuilder<Player>;
    });

    it("should call orWhere for name and alias", () => {
      const query = "lala";
      const resultFunction = likeNameOrAlias(query);
      resultFunction(fakeQueryBuilder);
      expect(fakeQueryBuilder.orWhere).toHaveBeenCalledTimes(2);
    });
  });
});
