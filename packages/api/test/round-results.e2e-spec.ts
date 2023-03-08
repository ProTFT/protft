import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GqlJwtAuthGuard, JwtAuthGuard } from "../src/auth/jwt-auth.guard";
import { RoundResultsResolver } from "../src/round-results/round-result.resolver";
import { RoundResultsService } from "../src/round-results/round-results.service";
import { RoundResultsController } from "../src/round-results/round-results.controller";

const graphql = "/graphql";

const mockResults = [
  {
    points: [0, 1, 2, 3],
  },
];

const mockRoundResults = [
  {
    position: 1,
  },
  {
    position: 2,
  },
];

const mockPlayerWithStats = [
  {
    player: {
      id: 1,
      slug: "test",
    },
    averagePosition: 2.8,
  },
  {
    player: {
      id: 2,
      slug: "test",
    },
    averagePosition: 3,
  },
];

const mockLobbyResults = [
  {
    id: 1,
    lobbies: [{ id: 1, results: mockResults }],
  },
];

const fakeRoundResultsService = {
  overviewResultsByStage: jest.fn().mockResolvedValue(mockResults),
  resultsByLobbyGroup: jest.fn().mockResolvedValue(mockResults),
  playerStats: jest.fn().mockResolvedValue(mockPlayerWithStats),
  createResults: jest.fn().mockResolvedValue(mockRoundResults),
  createBulk: jest.fn(),
  lobbyResultsByStage: jest.fn().mockResolvedValue(mockLobbyResults),
};

describe("Round Result (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
      ],
      providers: [RoundResultsResolver, RoundResultsService],
      controllers: [RoundResultsController],
    })
      .overrideProvider(RoundResultsService)
      .useValue(fakeRoundResultsService)
      .overrideGuard(GqlJwtAuthGuard)
      .useValue({})
      .overrideGuard(JwtAuthGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("resultsByStage", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            resultsByStage(stageId: 1) {
              points
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { resultsByStage: mockResults },
      });
    });
  });

  describe("lobbyResultsByStage", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            lobbyResultsByStage(stageId: 1) {
              id
              lobbies {
                id
                results {
                  points
                }
              }
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { lobbyResultsByStage: mockLobbyResults },
      });
    });
  });

  describe("resultsByLobbyGroup", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            resultsByLobbyGroup(lobbyGroupId: 1) {
              points
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { resultsByLobbyGroup: mockResults },
      });
    });
  });

  describe("playerStats", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            playerStats {
              player {
                id
                slug
              }
              averagePosition
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { playerStats: mockPlayerWithStats },
      });
    });
  });

  describe("createLobbyGroupResult", () => {
    it("should create", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            createLobbyGroupResult(lobbyGroupId: 1, results: [{
              lobbyPlayerId: 1,
              positions: [1, 2, 3]
            }]) {
              position
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { createLobbyGroupResult: mockRoundResults },
      });
    });
  });

  describe("uploadBulk", () => {
    it("should return bad request if no file is provided", async () => {
      await request(app.getHttpServer())
        .post("/roundResults/uploadBulk")
        .send()
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should call service", async () => {
      await request(app.getHttpServer())
        .post("/roundResults/uploadBulk")
        .field("stageId", "5")
        .attach("file", "test/data/fakeFile.csv")
        .expect(HttpStatus.CREATED);

      expect(fakeRoundResultsService.createBulk).toHaveBeenCalledWith(
        "test\n",
        5,
        false,
      );
    });

    it("should pass all parameters", async () => {
      await request(app.getHttpServer())
        .post("/roundResults/uploadBulk")
        .field("stageId", "5")
        .field("ignorePlayerNumber", "true")
        .attach("file", "test/data/fakeFile.csv")
        .expect(HttpStatus.CREATED);

      expect(fakeRoundResultsService.createBulk).toHaveBeenCalledWith(
        "test\n",
        5,
        true,
      );
    });
  });
});
