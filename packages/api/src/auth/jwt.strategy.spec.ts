import { ConfigService } from "@nestjs/config";
import { TEST_JWT } from "../../test/stubs/Config/FakeConfigService";
import { JwtStrategy } from "./jwt.strategy";

describe("JWT Strategy", () => {
  let strategy: JwtStrategy;
  const mockConfigService = {
    get: jest.fn().mockReturnValue(TEST_JWT),
  } as unknown as ConfigService;

  beforeEach(() => {
    strategy = new JwtStrategy(mockConfigService);
  });

  it("should return info from payload", async () => {
    const sub = "sub";
    const username = "username";
    const response = await strategy.validate({ sub, username });
    expect(response).toStrictEqual({
      userId: sub,
      username,
    });
  });
});
