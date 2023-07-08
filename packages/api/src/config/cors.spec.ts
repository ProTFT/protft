import { getOrigin } from "./cors";
import { Environments } from "./environment";

describe("Cors config", () => {
  it("if is prod, should get https domain", () => {
    expect(getOrigin(Environments.Production)).toStrictEqual([
      "https://www.protft.com",
      "https://protft.com",
      "https://roadto.protft.com",
      "https://www.roadto.protft.com",
    ]);
  });

  it("if is any other environment, should get local domain", () => {
    expect(getOrigin(undefined)).toBe("http://protft.com:3000");
  });
});
