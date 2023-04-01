import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { GqlJwtAuthGuard } from "../src/auth/jwt-auth.guard";
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { TournamentStreamsService } from "../src/tournament-streams/tournament-streams.service";
import { TournamentStreamsResolver } from "../src/tournament-streams/tournament-streams.resolver";

const fakeTournamentStreamsService = {
  findStreamsByTournament: jest.fn(),
  findVodsByTournament: jest.fn(),
  addStream: jest.fn(),
  deleteStream: jest.fn(),
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
      providers: [TournamentStreamsService, TournamentStreamsResolver],
    })
      .overrideProvider(TournamentStreamsService)
      .useValue(fakeTournamentStreamsService)
      .overrideGuard(GqlJwtAuthGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("streamsOfTournament", () => {
    it("should call service", async () => {
      await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: `
            query {
              streamsOfTournament(tournamentId: 1) {
                tournamentId
              }
            }`,
        });

      expect(
        fakeTournamentStreamsService.findStreamsByTournament,
      ).toHaveBeenCalledWith(1);
    });
  });

  describe("addTournamentStream", () => {
    it("should call service", async () => {
      await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: `
            mutation {
              addTournamentStream(tournamentId: 1, name: "test", link: "test", platform: "test", language: "test", isLive: false, isVOD: false) {
                tournamentId
              }
            }`,
        });

      expect(fakeTournamentStreamsService.addStream).toHaveBeenCalled();
    });
  });

  describe("deleteTournamentStream", () => {
    it("should call service", async () => {
      await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteTournamentStream(tournamentId: 1, name: "test") {
                id
              }
            }`,
        });

      expect(fakeTournamentStreamsService.deleteStream).toHaveBeenCalled();
    });
  });
});
