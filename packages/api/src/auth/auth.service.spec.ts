import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

let bCryptResponse = false;

jest.mock("bcrypt", () => ({
  compare: () => bCryptResponse,
}));

const COOKIE_NAME = "auth";

const mockUserService = {} as UsersService;
const fakeJwtToken = { id: 123 };
const jwtSignSpy = jest.fn().mockReturnValue(fakeJwtToken);
const mockJwtService = {
  sign: jwtSignSpy,
} as unknown as JwtService;
const mockUser = "anyUser";
const mockPass = "anyPass";

describe("Auth Service", () => {
  let authService: AuthService;
  const mockWrongPasswordUserObject = {
    username: mockUser,
    password: "otherPass",
  };
  const mockCorrectPasswordUserObject = {
    username: mockUser,
    password: mockPass,
  };

  beforeEach(async () => {
    authService = new AuthService(mockUserService, mockJwtService);
  });

  describe("validateUser", () => {
    it("if username is not found on DB, should return null", async () => {
      mockUserService.findOne = jest.fn().mockResolvedValue(undefined);

      const result = await authService.validateUser(mockUser, mockPass);

      expect(result).toBe(null);
    });

    it("if username exists, but password is not correct, should return null", async () => {
      mockUserService.findOne = jest
        .fn()
        .mockResolvedValue(mockWrongPasswordUserObject);

      const result = await authService.validateUser(mockUser, mockPass);

      expect(result).toBe(null);
    });

    it("if username exists and pass is correct, should return user without password", async () => {
      mockUserService.findOne = jest
        .fn()
        .mockResolvedValue(mockCorrectPasswordUserObject);
      bCryptResponse = true;

      const result = await authService.validateUser(mockUser, mockPass);

      expect(result).toStrictEqual({
        username: mockCorrectPasswordUserObject.username,
      });
    });
  });

  describe("login", () => {
    it("should sign jwt token and set cookie on browser", async () => {
      const mockUserPayload = {
        user: mockUser,
        id: 1,
      };
      const responseCookieSpy = jest.fn();
      const mockResponse = {
        cookie: responseCookieSpy,
      } as unknown as Response;

      await authService.login(mockUserPayload, mockResponse);

      expect(jwtSignSpy).toHaveBeenCalled();
      expect(responseCookieSpy).toHaveBeenCalledWith(
        COOKIE_NAME,
        fakeJwtToken,
        {
          httpOnly: true,
          sameSite: "none",
          signed: true,
          secure: true,
        },
      );
    });
  });

  describe("logout", () => {
    it("should clear cookies from browser", async () => {
      const responseClearCookieSpy = jest.fn();
      const mockResponse = {
        clearCookie: responseClearCookieSpy,
      } as unknown as Response;

      await authService.logout(mockResponse);

      expect(responseClearCookieSpy).toHaveBeenCalledWith(COOKIE_NAME);
    });
  });

  describe("signin", () => {
    it("if user already exists, should throw", async () => {
      mockUserService.findOne = jest.fn().mockReturnValue({});

      expect(
        async () => await authService.signin(mockUser, mockPass),
      ).rejects.toThrow();
    });

    it("if user does not exist, should create", async () => {
      const createUserSpy = jest.fn();
      mockUserService.findOne = jest.fn().mockReturnValue(undefined);
      mockUserService.createOne = createUserSpy;

      await authService.signin(mockUser, mockPass);

      expect(createUserSpy).toHaveBeenCalledWith(mockUser, mockPass);
    });
  });
});
