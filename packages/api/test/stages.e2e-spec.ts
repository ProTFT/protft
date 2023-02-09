import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { StagesService } from "../src/stages/stages.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GqlJwtAuthGuard } from "../src/auth/jwt-auth.guard";
import { StagesResolver } from "../src/stages/stages.resolver";
import { LobbiesService } from "../src/lobbies/lobbies.service";
import { RoundsService } from "../src/rounds/rounds.service";
import { PointSchemasService } from "../src/points/points.service";
import { StagePlayerInfosService } from "../src/stage-player-infos/stage-player-infos.service";

const graphql = "/graphql";

const mockStages = [
  {
    id: 1,
    name: "TournamentName",
  },
  {
    id: 2,
    name: "TournamentName2",
  },
];

const mockStagePlayerInfos = [
  {
    stageId: 1,
    playerId: 1,
    extraPoints: 0,
    tiebreakerRanking: 0,
  },
  {
    stageId: 1,
    playerId: 2,
    extraPoints: 0,
    tiebreakerRanking: 0,
  },
];

const mockSimpleStagePlayerInfos = mockStagePlayerInfos.map((spi) => ({
  playerId: spi.playerId,
}));

const mockGeneratedLobbies = {
  createdLobbyGroups: 1,
  createdLobbies: 1,
};

const mockLobbies = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const mockLobbyGroups = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const mockRounds = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const mockPointSchema = {
  id: 1,
};

const ROUNDS_BY_STAGE = 5;

const mockStageWithResolvedFields = {
  ...mockStages[0],
  lobbies: mockLobbies,
  lobbyGroups: mockLobbyGroups,
  rounds: mockRounds,
  roundCount: ROUNDS_BY_STAGE,
  pointSchema: mockPointSchema,
  players: mockStagePlayerInfos,
};

const mockTiebreakers = [{ id: 1, description: "lala" }];

const fakeStagesService = {
  findAllByTournament: jest.fn().mockResolvedValue(mockStages),
  findOne: jest.fn().mockResolvedValue(mockStages[0]),
  findPreviousStage: jest.fn().mockResolvedValue(mockStages[1]),
  findTiebreakers: jest.fn().mockResolvedValue(mockTiebreakers),
  createOne: jest.fn().mockResolvedValue(mockStages[0]),
  updateOne: jest.fn().mockResolvedValue(mockStages[0]),
  updateTiebreakers: jest.fn().mockResolvedValue(mockStages[0]),
  deleteOne: jest.fn().mockResolvedValue({ id: 1 }),
  generateLobbies: jest.fn().mockResolvedValue(mockGeneratedLobbies),
};

const fakeLobbiesService = {
  findAllByStage: jest.fn().mockResolvedValue(mockLobbies),
  findAllLobbyGroupsByStage: jest.fn().mockResolvedValue(mockLobbyGroups),
};

const fakeRoundsService = {
  findByStage: jest.fn().mockResolvedValue(mockRounds),
  countByStage: jest.fn().mockResolvedValue(ROUNDS_BY_STAGE),
};

const fakePointSchemasService = {
  findOne: jest.fn().mockResolvedValue(mockPointSchema),
};

const fakeStagePlayerInfosService = {
  findAllByStage: jest.fn().mockResolvedValue(mockStagePlayerInfos),
  createStagePlayers: jest.fn().mockResolvedValue(mockSimpleStagePlayerInfos),
  createStagePlayerByName: jest
    .fn()
    .mockResolvedValue(mockSimpleStagePlayerInfos),
};

describe("Stages (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
      ],
      providers: [
        StagesResolver,
        StagesService,
        LobbiesService,
        RoundsService,
        PointSchemasService,
        StagePlayerInfosService,
      ],
    })
      .overrideProvider(StagesService)
      .useValue(fakeStagesService)
      .overrideProvider(LobbiesService)
      .useValue(fakeLobbiesService)
      .overrideProvider(RoundsService)
      .useValue(fakeRoundsService)
      .overrideProvider(PointSchemasService)
      .useValue(fakePointSchemasService)
      .overrideProvider(StagePlayerInfosService)
      .useValue(fakeStagePlayerInfosService)
      .overrideGuard(GqlJwtAuthGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("stages", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            stages(tournamentId: 1) {
              id
              name
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { stages: mockStages },
      });
    });
  });

  describe("stage", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            stage(id: 1) {
              id
              name
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { stage: mockStages[0] },
      });
    });

    it("should resolve all fields", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            stage(id: 1) {
              id
              name
              lobbies {
                id
              }
              lobbyGroups {
                id
              }
              rounds {
                id
              }
              roundCount
              pointSchema {
                id
              }
              players {
                stageId
                playerId
                extraPoints
                tiebreakerRanking
              }
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { stage: mockStageWithResolvedFields },
      });
    });
  });

  describe("playerFromPreviousStage", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            playersFromPreviousStage(id: 1) {
              stageId
              playerId
              extraPoints
              tiebreakerRanking
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { playersFromPreviousStage: mockStagePlayerInfos },
      });
    });
  });

  describe("tiebreakers", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            tiebreakers {
              id
              description
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { tiebreakers: mockTiebreakers },
      });
    });
  });

  describe("createStage", () => {
    it("should create new stage", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            createStage(tournamentId: 1, pointSchemaId: 2, name: "name", sequence: 1, isFinal: false, roundCount: 1, tiebreakers: [1, 2, 3], description: "desc") {
              id
              name
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { createStage: mockStages[0] },
      });
    });
  });

  describe("updateStage", () => {
    it("should update", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            updateStage(id: 1, tournamentId: 1, pointSchemaId: 2, name: "name", sequence: 1, isFinal: false, roundCount: 1, tiebreakers: [1, 2, 3], description: "desc") {
              id
              name
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { updateStage: mockStages[0] },
      });
    });
  });

  describe("updateTiebreakers", () => {
    it("should update", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            updateTiebreakers(id: 1, tiebreakers: [1, 2, 3]) {
              id
              name
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { updateTiebreakers: mockStages[0] },
      });
    });
  });

  describe("deleteStage", () => {
    it("should delete", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            deleteStage(id: 1) {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { deleteStage: { id: 1 } },
      });
    });
  });

  describe("createStagePlayers", () => {
    it("should create", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            createStagePlayers(stageId: 1, playerIds: [1, 2, 3]) {
              playerId
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { createStagePlayers: mockSimpleStagePlayerInfos },
      });
    });
  });

  describe("createStagePlayersByName", () => {
    it("should create", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            createStagePlayersByName(stageId: 1, playerNames: "LucasPedro") {
              playerId
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { createStagePlayersByName: mockSimpleStagePlayerInfos },
      });
    });
  });

  describe("generateLobbies", () => {
    it("should generate", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            generateLobbies(stageId: 1, roundsPerLobbyGroup: 2) {
              createdLobbyGroups
              createdLobbies
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { generateLobbies: mockGeneratedLobbies },
      });
    });
  });
});
