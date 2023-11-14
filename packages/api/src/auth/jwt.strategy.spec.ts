import { ConfigService } from "@nestjs/config";
import { TEST_JWT } from "../../test/stubs/Config/FakeConfigService";
import { Roles } from "../users/user.entity";
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
    const sub = 1;
    const username = "username";
    const roles = [Roles.WEBMASTER];
    const response = await strategy.validate({ sub, username, roles });
    expect(response).toStrictEqual({
      userId: sub,
      username,
      roles: [Roles.WEBMASTER],
    });
  });
});
