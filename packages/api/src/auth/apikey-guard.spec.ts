import { ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiKeyGuard } from "./apikey.guard";

const configService = { get: jest.fn() } as unknown as ConfigService;

const createContext = (apiKeyValue?: string): ExecutionContext =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({
        headers: {
          "x-api-key": apiKeyValue,
        },
      }),
    }),
  } as ExecutionContext);

describe("Api Key Guard", () => {
  it("should not pass if API_KEY header is not present", () => {
    const guard = new ApiKeyGuard(configService);
    const result = guard.canActivate(createContext());
    expect(result).toBeFalsy();
  });

  it("should not pass if config apikey is not present", () => {
    const guard = new ApiKeyGuard(configService);
    const result = guard.canActivate(createContext("SECRET"));
    expect(result).toBeFalsy();
  });

  it("should not pass if header is different from config", () => {
    (configService.get as jest.Mock).mockReturnValueOnce("OTHERSECRET");
    const guard = new ApiKeyGuard(configService);
    const result = guard.canActivate(createContext("SECRET"));
    expect(result).toBeFalsy();
  });

  it("should pass if header is the same from config", () => {
    (configService.get as jest.Mock).mockReturnValueOnce("SECRET");
    const guard = new ApiKeyGuard(configService);
    const result = guard.canActivate(createContext("SECRET"));
    expect(result).toBeTruthy();
  });
});
