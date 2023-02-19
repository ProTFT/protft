import { SelectQueryBuilder } from "typeorm";
import { createOrWhereConditions } from "./DBOrFilter";

describe("DB or where filter", () => {
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
