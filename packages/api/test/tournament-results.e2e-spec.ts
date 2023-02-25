import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { GqlJwtAuthGuard, JwtAuthGuard } from "../src/auth/jwt-auth.guard";
import { TournamentResultsService } from "../src/tournament-results/tournament-results.service";
import { TournamentResultsResolver } from "../src/tournament-results/tournament-results.resolver";
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";

const fakeTournamentResultsService = {
  lockResults: jest.fn(),
  findAllByTournament: jest.fn(),
};

describe("Tournament Result Infos (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
          resolvers: [],
        }),
      ],
      providers: [TournamentResultsService, TournamentResultsResolver],
    })
      .overrideProvider(TournamentResultsService)
      .useValue(fakeTournamentResultsService)
      .overrideGuard(GqlJwtAuthGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("resultsOfTournament", () => {
    it("should call service", async () => {
      await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: `
            query {
              resultsOfTournament(tournamentId: 1) {
                tournamentId
              }
            }`,
        })
        .expect(HttpStatus.OK);

      expect(
        fakeTournamentResultsService.findAllByTournament,
      ).toHaveBeenCalledWith(1);
    });
  });

  describe("lockTournament", () => {
    it("should call service", async () => {
      await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: `
            mutation {
              lockTournament(id: 1) {
                tournamentId
              }
            }`,
        })
        .expect(HttpStatus.OK);

      expect(fakeTournamentResultsService.lockResults).toHaveBeenCalledWith(1);
    });
  });
});
