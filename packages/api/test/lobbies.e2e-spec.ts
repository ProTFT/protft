import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GqlJwtAuthGuard } from "../src/auth/jwt-auth.guard";
import { LobbiesService } from "../src/lobbies/lobbies.service";
import { RoundsService } from "../src/rounds/rounds.service";
import { LobbiesResolver } from "../src/lobbies/lobbies.resolver";

const graphql = "/graphql";

const mockLobbies = [
  {
    id: 1,
    sequence: 0,
  },
  {
    id: 2,
    sequence: 1,
  },
];

const mockLobbiesWithPlayers = mockLobbies.map((lobby) => ({
  ...lobby,
  players: [{ id: 1 }],
}));

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
];

const mockLobbyPlayerInfo = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const fakeLobbiesService = {
  findAllLobbyGroupsByStage: jest.fn().mockResolvedValue(mockLobbyGroups),
  findAllByLobbyGroup: jest.fn().mockResolvedValue(mockLobbies),
  createOne: jest.fn().mockResolvedValue(mockLobbies[0]),
  updateOne: jest.fn().mockResolvedValue(mockLobbies[0]),
  deleteOne: jest.fn().mockResolvedValue({ id: 1 }),
  createPlayerLobbyGroup: jest.fn().mockResolvedValue(mockLobbyPlayerInfo),
  findOneWithRelations: jest
    .fn()
    .mockResolvedValue({ ...mockLobbies[0], players: [{ player: { id: 1 } }] }),
};

const fakeRoundsService = {
  createOne: jest.fn().mockResolvedValue(mockRounds[0]),
};

describe("Lobby (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
      ],
      providers: [LobbiesResolver, LobbiesService, RoundsService],
    })
      .overrideProvider(LobbiesService)
      .useValue(fakeLobbiesService)
      .overrideProvider(RoundsService)
      .useValue(fakeRoundsService)
      .overrideGuard(GqlJwtAuthGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("lobbies", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            lobbies(lobbyGroupId: 1) {
              id
              sequence
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { lobbies: mockLobbies },
      });
    });

    it("should get all relations", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            lobbies(lobbyGroupId: 1) {
              id
              sequence
              players {
                id
              }
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { lobbies: mockLobbiesWithPlayers },
      });
    });
  });

  describe("createLobby", () => {
    it("should create", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            createLobby(stageId: 1, name: "name", sequence: 1, lobbyGroupId: 1) {
              id
              sequence
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { createLobby: mockLobbies[0] },
      });
    });
  });

  describe("updateLobby", () => {
    it("should update", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            updateLobby(id: 1, stageId: 1, name: "name", sequence: 1, lobbyGroupId: 1) {
              id
              sequence
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { updateLobby: mockLobbies[0] },
      });
    });
  });

  describe("deleteLobby", () => {
    it("should delete", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            deleteLobby(id: 1) {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { deleteLobby: { id: 1 } },
      });
    });
  });

  describe("createRound", () => {
    it("should create round", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            createRound(stageId: 1, sequence: 1) {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { createRound: mockRounds[0] },
      });
    });
  });

  describe("createLobbyPlayers", () => {
    it("should create player lobby group", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            createLobbyPlayers(lobbies: {
              lobbyId: 1,
              playerIds: [1, 2, 3],
            }) {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { createLobbyPlayers: mockLobbyPlayerInfo },
      });
    });
  });
});
