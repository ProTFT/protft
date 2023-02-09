import { UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

const mockUser = {
  id: 1,
  name: "name",
};

describe("Local Strategy", () => {
  let strategy: LocalStrategy;
  const mockAuthService = {
    validateUser: jest.fn().mockReturnValue(mockUser),
  } as unknown as AuthService;

  beforeEach(() => {
    strategy = new LocalStrategy(mockAuthService);
  });

  it("should return user if it is valid", async () => {
    const username = "username";
    const password = "password";
    const response = await strategy.validate(username, password);
    expect(response).toStrictEqual(mockUser);
  });

  it("should throw exception if user is not valid", () => {
    mockAuthService.validateUser = jest.fn().mockResolvedValue(undefined);
    expect(
      async () => await strategy.validate("user", "name"),
    ).rejects.toThrowError(UnauthorizedException);
  });
});
