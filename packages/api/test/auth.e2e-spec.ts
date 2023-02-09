import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../src/auth/auth.service";
import { LocalStrategy } from "../src/auth/local.strategy";
import { JwtStrategy } from "../src/auth/jwt.strategy";
import { AuthController } from "../src/auth/auth.controller";
import {
  FakeConfigService,
  TEST_SIGNIN,
} from "./stubs/Config/FakeConfigService";
import { FakeAuthService } from "./stubs/Auth/FakeAuthService";

const fakeUsername = "anyUser";
const fakePassword = "anyPass";

describe("Authentication (e2e)", () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
    })
      .overrideProvider(AuthService)
      .useClass(FakeAuthService)
      .overrideProvider(ConfigService)
      .useClass(FakeConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);
    await app.init();
  });

  describe("/auth/login (GET)", () => {
    it("should be unauthorized by default", () => {
      return request(app.getHttpServer())
        .get("/auth/login")
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("/auth/login (POST)", () => {
    it("should be unauthorized if user does not exist", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({
          username: fakeUsername,
          password: fakePassword,
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it("should accept if user data is valid", () => {
      authService.validateUser = jest.fn().mockResolvedValue(true);

      return request(app.getHttpServer())
        .post("/auth/login")
        .send({
          username: fakeUsername,
          password: fakePassword,
        })
        .expect(HttpStatus.ACCEPTED);
    });
  });

  describe("/auth/signin (POST)", () => {
    it("should be unauthorized if signin key is not correct", () => {
      return request(app.getHttpServer())
        .post("/auth/signin")
        .send({
          username: fakeUsername,
          password: fakePassword,
          key: "anyOtherKey",
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it("should create user if key is valid", () => {
      const signinSpy = jest.fn();
      authService.signin = signinSpy;

      return request(app.getHttpServer())
        .post("/auth/signin")
        .send({
          username: fakeUsername,
          password: fakePassword,
          key: TEST_SIGNIN,
        })
        .expect(HttpStatus.CREATED);
    });
  });

  describe("/auth/logout (POST)", () => {
    it("should call logout function", () => {
      return request(app.getHttpServer())
        .post("/auth/logout")
        .expect(HttpStatus.ACCEPTED);
    });
  });
});
