import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { TournamentsResolver } from "../src/tournaments/tournaments.resolver";
import { TournamentsService } from "../src/tournaments/tournaments.service";
import { SetsService } from "../src/sets/sets.service";
import { StagesService } from "../src/stages/stages.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GqlJwtAuthGuard } from "../src/auth/jwt-auth.guard";

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

const fakeTournamentService = {
  findAll: jest.fn().mockResolvedValue(mockTournaments),
  findOne: jest.fn().mockResolvedValue(mockTournamentWithResolvedFields),
  findOneBySlug: jest.fn().mockResolvedValue(mockTournaments[0]),
  findOngoing: jest.fn().mockResolvedValue(mockTournaments),
  findUpcoming: jest.fn().mockResolvedValue(mockTournaments),
  findPast: jest.fn().mockResolvedValue(mockTournaments),
  createOne: jest.fn().mockResolvedValue(mockTournaments[0]),
  updateOne: jest.fn().mockResolvedValue(mockTournaments[0]),
  deleteOne: jest.fn().mockResolvedValue(mockTournaments[0]),
  createTournamentPlayers: jest.fn().mockResolvedValue(mockTournaments[0]),
  createTournamentPlayersByName: jest
    .fn()
    .mockResolvedValue(mockTournaments[0]),
  createMissingSlugs: jest.fn().mockResolvedValue(mockTournaments),
  findWithStats: jest.fn().mockResolvedValue(mockTournaments),
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
        SetsService,
        TournamentsService,
        StagesService,
      ],
    })
      .overrideProvider(SetsService)
      .useValue(fakeSetsService)
      .overrideProvider(TournamentsService)
      .useValue(fakeTournamentService)
      .overrideProvider(StagesService)
      .useValue(fakeStagesService)
      .overrideGuard(GqlJwtAuthGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

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

      expect(fakeTournamentService.findAll).toHaveBeenCalledWith(
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

      expect(fakeTournamentService.findUpcoming).toHaveBeenCalledWith(
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

      expect(fakeTournamentService.findPast).toHaveBeenCalledWith(
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
            createTournament(name: "name", setId: 1) {
              id
              name
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(fakeTournamentService.createOne).toHaveBeenCalled();
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

      expect(fakeTournamentService.updateOne).toHaveBeenCalled();
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

      expect(fakeTournamentService.deleteOne).toHaveBeenCalled();
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

      expect(fakeTournamentService.createTournamentPlayers).toHaveBeenCalled();
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
        fakeTournamentService.createTournamentPlayersByName,
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

      expect(fakeTournamentService.createMissingSlugs).toHaveBeenCalled();
      expect(response.body).toStrictEqual({
        data: { createTournamentSlugs: mockTournaments },
      });
    });
  });
});
