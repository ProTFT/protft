import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GqlJwtAuthGuard, JwtAuthGuard } from "../src/auth/jwt-auth.guard";
import { PlayersResolver } from "../src/players/players.resolver";
import { RoundResultsService } from "../src/round-results/round-results.service";
import { PlayersService } from "../src/players/players.service";
import { PlayersController } from "../src/players/players.controller";
import { ApiKeyGuard } from "../src/auth/apikey.guard";
import { PlayersExternalController } from "../src/players/players-external.controller";
import { RegionCode } from "../src/tournaments/types/region.types";
import { CacheService } from "../src/cache/cache.service";

const restUrl = "/players";
const graphql = "/graphql";

const mockPlayers = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const mockPlayerStats = {
  averagePosition: 1,
  totalGames: 1,
  topFourCount: 1,
  topOneCount: 1,
  eigthCount: 1,
};

const mockTournaments = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const mockLinks = [{ id: 1, type: "test" }];

const mockPlayerFilterMeta = {
  possibleCountries: ["Brazil", "Germany"],
  possibleRegions: ["EMEA", "BR"],
};

const fakePlayersService = {
  findAll: jest.fn().mockResolvedValue(mockPlayers),
  findOne: jest.fn().mockResolvedValue(mockPlayers[0]),
  getPlayerStats: jest.fn().mockResolvedValue(mockPlayerStats),
  findTournamentsPlayed: jest.fn().mockResolvedValue(mockTournaments),
  createOne: jest.fn().mockResolvedValue(mockPlayers[0]),
  createMissingSlugs: jest.fn().mockResolvedValue(mockPlayers),
  deleteOne: jest.fn().mockResolvedValue({ id: 1 }),
  updateOne: jest.fn().mockResolvedValue({ id: 1 }),
  createBulk: jest.fn(),
  findOneBySlug: jest.fn().mockResolvedValue(mockPlayers[0]),
  findUniqueCountries: jest
    .fn()
    .mockResolvedValue(mockPlayerFilterMeta.possibleCountries),
  findUniqueRegions: jest
    .fn()
    .mockResolvedValue(mockPlayerFilterMeta.possibleRegions),
  findLinks: jest.fn().mockResolvedValue(mockLinks),
  merge: jest.fn().mockResolvedValue(mockPlayers[0]),
};

const fakeRoundResultsService = {};

describe("Player (e2e)", () => {
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
        PlayersResolver,
        PlayersService,
        RoundResultsService,
        CacheService,
      ],
      controllers: [PlayersController, PlayersExternalController],
    })
      .overrideProvider(PlayersService)
      .useValue(fakePlayersService)
      .overrideProvider(RoundResultsService)
      .useValue(fakeRoundResultsService)
      .overrideProvider(CacheService)
      .useValue({
        get: jest.fn(),
        set: jest.fn(),
      })
      .overrideGuard(GqlJwtAuthGuard)
      .useValue({})
      .overrideGuard(JwtAuthGuard)
      .useValue({})
      .overrideGuard(ApiKeyGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("GQL", () => {
    describe("players", () => {
      it("should get data from service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              players {
                id
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { players: mockPlayers },
        });
      });
    });

    describe("adminPlayers", () => {
      it("should get players in descending ID order", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              adminPlayers(region: "EMEA") {
                id
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(fakePlayersService.findAll).toHaveBeenCalledWith(
          { region: "EMEA" },
          {},
        );
        expect(response.body).toStrictEqual({
          data: { adminPlayers: mockPlayers },
        });
      });
    });

    describe("player", () => {
      it("should get player", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query($id: Int!) {
              player(id: $id) {
                id
              }
            }`,
            variables: { id: 1 },
          });
        // .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { player: mockPlayers[0] },
        });
      });

      it("should get player with relations", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query($id: Int!) {
              player(id: $id) {
                id
                playerStats {
                  averagePosition
                  totalGames
                  topFourCount
                  topOneCount
                  eigthCount
                }
                links {
                  id
                  type
                }
              }
            }`,
            variables: { id: 1 },
          });

        expect(response.body).toStrictEqual({
          data: {
            player: {
              ...mockPlayers[0],
              playerStats: mockPlayerStats,
              links: mockLinks,
            },
          },
        });
      });
    });

    describe("playerBySlug", () => {
      it("should get playerBySlug", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              playerBySlug(slug: "slug") {
                id
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { playerBySlug: mockPlayers[0] },
        });
      });
    });

    describe("playerFilterMeta", () => {
      it("should get playerBySlug", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              playerFilterMeta {
                possibleCountries
                possibleRegions
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { playerFilterMeta: mockPlayerFilterMeta },
        });
      });
    });

    describe("tournamentsPlayed", () => {
      it("should get response from service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              tournamentsPlayed(playerId: 1) {
                id
              }
            }`,
          })
          .expect(HttpStatus.OK);
        expect(response.body).toStrictEqual({
          data: { tournamentsPlayed: mockTournaments },
        });
      });
    });

    describe("createPlayer", () => {
      it("should create", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              createPlayer(name: "name", country: "country", region: "EMEA") {
                id
              }
            }`,
          })
          .expect(HttpStatus.OK);
        expect(response.body).toStrictEqual({
          data: { createPlayer: mockPlayers[0] },
        });
      });
    });

    describe("createPlayerSlugs", () => {
      it("should create", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              createPlayerSlugs {
                id
              }
            }`,
          })
          .expect(HttpStatus.OK);
        expect(response.body).toStrictEqual({
          data: { createPlayerSlugs: mockPlayers },
        });
      });
    });

    describe("deletePlayer", () => {
      it("should delete", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              deletePlayer(id: 1) {
                id
              }
            }`,
          })
          .expect(HttpStatus.OK);
        expect(response.body).toStrictEqual({
          data: { deletePlayer: { id: 1 } },
        });
      });
    });

    describe("updatePlayer", () => {
      it("should update", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              updatePlayer(id: 1, name: "newName") {
                id
              }
            }`,
          });
        expect(response.body).toStrictEqual({
          data: { updatePlayer: { id: 1 } },
        });
      });
    });

    describe("uploadBulk", () => {
      it("should return bad request if no file is provided", async () => {
        await request(app.getHttpServer())
          .post("/players/uploadBulk")
          .send()
          .expect(HttpStatus.BAD_REQUEST);
      });

      it("should call service", async () => {
        await request(app.getHttpServer())
          .post("/players/uploadBulk")
          .field("dryRun", "false")
          .attach("file", "test/data/fakeFile.csv")
          .expect(HttpStatus.CREATED);

        expect(fakePlayersService.createBulk).toHaveBeenCalledWith(
          "test\n",
          false,
        );
      });
    });

    describe("mergePlayer", () => {
      it("should call service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              mergePlayer(playerIdToMaintain: 10, playerIdToRemove: 11) {
                id
              }
            }`,
          })
          .expect(HttpStatus.OK);
        expect(response.body).toStrictEqual({
          data: { mergePlayer: { id: mockPlayers[0].id } },
        });
      });
    });
  });

  describe("External endpoints", () => {
    describe("create one", () => {
      it("should validate payload", async () => {
        const response = await request(app.getHttpServer())
          .post(restUrl)
          .send({});

        expect(response.statusCode).toBe(400);
      });

      it("should call service with required fields", async () => {
        const response = await request(app.getHttpServer()).post(restUrl).send({
          name: "PlayerName",
          country: "FRA",
          region: RegionCode.BR,
        });

        expect(response.statusCode).toBe(201);
        expect(fakePlayersService.createOne).toHaveBeenCalled();
      });

      it("extra fields should not be passed to service", async () => {
        const response = await request(app.getHttpServer()).post(restUrl).send({
          name: "PlayerName",
          country: "FRA",
          region: RegionCode.BR,
          otherField: "lala",
        });

        expect(response.statusCode).toBe(201);
        expect(fakePlayersService.createOne).toHaveBeenCalledWith({
          name: "PlayerName",
          country: "FRA",
          region: RegionCode.BR,
        });
      });
    });
  });
});
