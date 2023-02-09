import { getDatabaseInfo } from "./dbConfig";
import { Environments } from "./environment";

describe("dbConfig", () => {
  it("if is prod, should get production database info", () => {
    expect(getDatabaseInfo(Environments.Production)).toHaveProperty("url");
  });

  it("if is other env, should get local database info", () => {
    expect(getDatabaseInfo(undefined)).toHaveProperty("host", "localhost");
  });
});
