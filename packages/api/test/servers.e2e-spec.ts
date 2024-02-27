import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { ServersService } from "../src/servers/servers.service";
import { ApiKeyGuard } from "../src/auth/apikey.guard";
import { ServersExternalController } from "../src/servers/servers-external.controller";

const url = "/servers";

const mockServers = [
  {
    id: 1,
  },
];

const serversService = {
  findAll: jest.fn().mockResolvedValue(mockServers),
  createOne: jest.fn().mockResolvedValue(mockServers[0]),
};

describe("Servers (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ServersExternalController],
      providers: [ServersService],
    })
      .overrideProvider(ServersService)
      .useValue(serversService)
      .overrideGuard(ApiKeyGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("External Endpoints", () => {
    describe("findAll", () => {
      it("should get all servers", async () => {
        const response = await request(app.getHttpServer()).get(url);

        expect(response.body).toStrictEqual(mockServers);
      });
    });

    describe("createOne", () => {
      it("should be able to create a server", async () => {
        const response = await request(app.getHttpServer()).post(url).send({
          name: "United States",
          code: "NA",
          apiMinorRegion: "Test",
          apiMajorRegion: "Test2",
        });

        expect(response.body).toStrictEqual(mockServers[0]);
      });

      it("should validate mandatory fields", async () => {
        const response = await request(app.getHttpServer()).post(url).send({
          name: "United States",
          code: "NA",
          apiMinorRegion: "Test",
        });

        expect(response.statusCode).toBe(400);
      });
    });
  });
});
