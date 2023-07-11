import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { TournamentsResolver } from "../src/tournaments/tournaments.resolver";
import { SetsService } from "../src/sets/sets.service";
import { StagesService } from "../src/stages/stages.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GqlJwtAuthGuard } from "../src/auth/jwt-auth.guard";
import { TournamentsReadService } from "../src/tournaments/services/tournaments-read.service";
import { TournamentsFieldsService } from "../src/tournaments/services/tournaments-fields.service";
import { TournamentsWriteService } from "../src/tournaments/services/tournaments-write.service";
import { TournamentsExternalController } from "../src/tournaments/tournaments-external.controller";
import { ApiKeyGuard } from "../src/auth/apikey.guard";
import { TournamentsExternalService } from "../src/tournaments/services/tournaments-external.service";
import { StageType } from "../src/stages/types/StageType";

const restUrl = "/tournaments";
const graphql = "/graphql";

const mockTournaments = [
  {
    id: 1,
    name: "TournamentName",
  },
  {
    id: 2,
    name: "TournamentName2",
  },
];

const mockSet = {
  id: 1,
  name: "Gizmos and Gadgets",
};

const mockStage = {
  id: 1,
  name: "Day 1",
};

const mockPlayer = {
  id: 1,
  name: "PlayerName",
};

const mockTournamentWithResolvedFields = {
  ...mockTournaments[0],
  set: mockSet,
  stages: [mockStage],
  players: [mockPlayer],
};

const mockStartTime = 5;

const fakeTournamentWriteService = {
  createOne: jest.fn().mockResolvedValue(mockTournaments[0]),
  updateOne: jest.fn().mockResolvedValue(mockTournaments[0]),
  deleteOne: jest.fn().mockResolvedValue(mockTournaments[0]),
  createTournamentPlayers: jest.fn().mockResolvedValue(mockTournaments[0]),
  createTournamentPlayersByName: jest
    .fn()
    .mockResolvedValue(mockTournaments[0]),
  createMissingSlugs: jest.fn().mockResolvedValue(mockTournaments),
  createStage: jest.fn(),
} as unknown as TournamentsWriteService;

const fakeTournamentExternalService = {
  createOne: jest.fn().mockResolvedValue(mockTournaments[0]),
};

const fakeTournamentsReadService = {
  findAll: jest.fn().mockResolvedValue(mockTournaments),
  findOne: jest.fn().mockResolvedValue(mockTournamentWithResolvedFields),
  findOneBySlug: jest.fn().mockResolvedValue(mockTournaments[0]),
  findOngoing: jest.fn().mockResolvedValue(mockTournaments),
  findUpcoming: jest.fn().mockResolvedValue(mockTournaments),
  findPast: jest.fn().mockResolvedValue(mockTournaments),
  findWithStats: jest.fn().mockResolvedValue(mockTournaments),
};

const fakeTournamentsFieldsService = {
  findNextStageStartTime: jest.fn().mockResolvedValue(mockStartTime),
};

const fakeSetsService = {
  findOne: jest.fn().mockResolvedValue(mockSet),
};

const fakeStagesService = {
  findAllByTournament: jest.fn().mockResolvedValue([mockStage]),
};

describe("Tournament (e2e)", () => {
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
        TournamentsResolver,
        TournamentsReadService,
        TournamentsFieldsService,
        SetsService,
        TournamentsWriteService,
        StagesService,
        TournamentsExternalService,
      ],
      controllers: [TournamentsExternalController],
    })
      .overrideProvider(SetsService)
      .useValue(fakeSetsService)
      .overrideProvider(TournamentsWriteService)
      .useValue(fakeTournamentWriteService)
      .overrideProvider(TournamentsReadService)
      .useValue(fakeTournamentsReadService)
      .overrideProvider(TournamentsExternalService)
      .useValue(fakeTournamentExternalService)
      .overrideProvider(TournamentsFieldsService)
      .useValue(fakeTournamentsFieldsService)
      .overrideProvider(StagesService)
      .useValue(fakeStagesService)
      .overrideGuard(GqlJwtAuthGuard)
      .useValue({})
      .overrideGuard(ApiKeyGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("GQL", () => {
    describe("tournaments", () => {
      it("should get data from service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              tournaments {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { tournaments: mockTournaments },
        });
      });

      it("should get nextStartTime resolved", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              tournaments {
                id
                name
                nextStartTime
              }
            }`,
          });

        const tournamentsWithStartTime = mockTournaments.map((tournament) => ({
          ...tournament,
          nextStartTime: mockStartTime,
        }));

        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body).toStrictEqual({
          data: {
            tournaments: tournamentsWithStartTime,
          },
        });
      });

      it("should apply filters and pagination", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              tournaments(searchQuery: "Test", region: ["WO", "NA"], setId: [1, 2], take: 20, skip: 20) {
                id
                name
              }
            }`,
          });

        expect(fakeTournamentsReadService.findAll).toHaveBeenCalledWith(
          { searchQuery: "Test", region: ["WO", "NA"], setId: [1, 2] },
          { take: 20, skip: 20 },
        );
        expect(response.body).toStrictEqual({
          data: { tournaments: mockTournaments },
        });
      });
    });

    describe("adminTournaments", () => {
      it("should get data from service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              adminTournaments {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { adminTournaments: mockTournaments },
        });
      });
    });

    describe("tournament", () => {
      it("should get data from service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              tournament(id: 1) {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { tournament: mockTournaments[0] },
        });
      });

      it("should get relations", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              tournament(id: 1) {
                id
                name
                set {
                  id
                  name
                }
                stages {
                  id
                  name
                }
                players {
                  id
                  name
                }
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { tournament: mockTournamentWithResolvedFields },
        });
      });
    });

    describe("tournamentBySlug", () => {
      it("should get data from service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              tournamentBySlug(slug: "Slug") {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { tournamentBySlug: mockTournaments[0] },
        });
      });
    });

    describe("tournamentsWithStats", () => {
      it("should get data from service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              tournamentsWithStats {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { tournamentsWithStats: mockTournaments },
        });
      });
    });

    describe("ongoingTournaments", () => {
      it("should get data from service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              ongoingTournaments {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { ongoingTournaments: mockTournaments },
        });
      });
    });

    describe("upcomingTournaments", () => {
      it("should get data from service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              upcomingTournaments {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { upcomingTournaments: mockTournaments },
        });
      });

      it("should apply filters and pagination", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              upcomingTournaments(searchQuery: "Test", region: ["WO", "NA"], setId: [1, 2], take: 20, skip: 20) {
                id
                name
              }
            }`,
          });

        expect(fakeTournamentsReadService.findUpcoming).toHaveBeenCalledWith(
          { searchQuery: "Test", region: ["WO", "NA"], setId: [1, 2] },
          { take: 20, skip: 20 },
        );
        expect(response.body).toStrictEqual({
          data: { upcomingTournaments: mockTournaments },
        });
      });
    });

    describe("pastTournaments", () => {
      it("should get data from service", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              pastTournaments {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(response.body).toStrictEqual({
          data: { pastTournaments: mockTournaments },
        });
      });

      it("should apply filters and pagination", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            query {
              pastTournaments(searchQuery: "Test", region: ["WO", "NA"], setId: [1, 2], take: 20, skip: 20) {
                id
                name
              }
            }`,
          });

        expect(fakeTournamentsReadService.findPast).toHaveBeenCalledWith(
          { searchQuery: "Test", region: ["WO", "NA"], setId: [1, 2] },
          { take: 20, skip: 20 },
        );
        expect(response.body).toStrictEqual({
          data: { pastTournaments: mockTournaments },
        });
      });
    });

    describe("createTournament", () => {
      it("should call tournament creation", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              createTournament(name: "name", setId: 1, region: ["NA"]) {
                id
                name
              }
            }`,
          });

        expect(fakeTournamentWriteService.createOne).toHaveBeenCalled();
        expect(response.body).toStrictEqual({
          data: { createTournament: mockTournaments[0] },
        });
      });
    });

    describe("updateTournament", () => {
      it("should call tournament update", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              updateTournament(id: 1, name: "name") {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(fakeTournamentWriteService.updateOne).toHaveBeenCalled();
        expect(response.body).toStrictEqual({
          data: { updateTournament: mockTournaments[0] },
        });
      });
    });

    describe("deleteTournament", () => {
      it("should call tournament delete", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              deleteTournament(id: 1) {
                id
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(fakeTournamentWriteService.deleteOne).toHaveBeenCalled();
        expect(response.body).toStrictEqual({
          data: { deleteTournament: { id: mockTournaments[0].id } },
        });
      });
    });

    describe("createTournamentPlayers", () => {
      it("should call tournament player creation", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              createTournamentPlayers(tournamentId: 1, playerIds: [1, 2, 3]) {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(
          fakeTournamentWriteService.createTournamentPlayers,
        ).toHaveBeenCalled();
        expect(response.body).toStrictEqual({
          data: { createTournamentPlayers: mockTournaments[0] },
        });
      });
    });

    describe("createTournamentPlayersByName", () => {
      it("should call tournament player creation by name", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              createTournamentPlayersByName(tournamentId: 1, playerNames: "LucasTestPedro") {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(
          fakeTournamentWriteService.createTournamentPlayersByName,
        ).toHaveBeenCalled();
        expect(response.body).toStrictEqual({
          data: { createTournamentPlayersByName: mockTournaments[0] },
        });
      });
    });

    describe("createTournamentSlugs", () => {
      it("should call slug creation", async () => {
        const response = await request(app.getHttpServer())
          .post(graphql)
          .send({
            query: `
            mutation {
              createTournamentSlugs {
                id
                name
              }
            }`,
          })
          .expect(HttpStatus.OK);

        expect(
          fakeTournamentWriteService.createMissingSlugs,
        ).toHaveBeenCalled();
        expect(response.body).toStrictEqual({
          data: { createTournamentSlugs: mockTournaments },
        });
      });
    });
  });

  describe("External Controller", () => {
    describe("create one", () => {
      it("should call service with minimum fields", async () => {
        const response = await request(app.getHttpServer())
          .post(restUrl)
          .send({
            name: "Name",
            setId: 1,
            description: "Alala",
            region: ["BR"],
          });

        expect(fakeTournamentWriteService.createOne).toHaveBeenCalled();
        expect(response.statusCode).toBe(201);
      });
    });

    describe("create stage", () => {
      it("should call service with minimum fields", async () => {
        const response = await request(app.getHttpServer())
          .post(`${restUrl}/1/stages`)
          .send({
            pointSchemaId: 1,
            name: "Name",
            sequence: 1,
            stageType: StageType.RANKING,
            roundCount: 6,
          });

        expect(fakeTournamentWriteService.createStage).toHaveBeenCalled();
        expect(response.statusCode).toBe(201);
      });
    });
  });
});
