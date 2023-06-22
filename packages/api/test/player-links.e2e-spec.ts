import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GqlJwtAuthGuard } from "../src/auth/jwt-auth.guard";
import { PlayerLinksResolver } from "../src/player-links/player-links.resolver";
import { PlayerLinksService } from "../src/player-links/player-links.service";

const graphql = "/graphql";

const mockPlayerLinks = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const playerLinksService = {
  findOne: jest.fn().mockResolvedValue(mockPlayerLinks[0]),
  createOne: jest.fn().mockResolvedValue(mockPlayerLinks[0]),
  updateOne: jest.fn().mockResolvedValue(mockPlayerLinks[0]),
  deleteOne: jest.fn().mockResolvedValue(mockPlayerLinks[0]),
};

describe("Player Links (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
      ],
      providers: [PlayerLinksResolver, PlayerLinksService],
    })
      .overrideProvider(PlayerLinksService)
      .useValue(playerLinksService)
      .overrideGuard(GqlJwtAuthGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("playerLink", () => {
    it("should get one link", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            playerLink(id: 1) {
              id
            }
          }`,
        });

      expect(response.body).toStrictEqual({
        data: { playerLink: mockPlayerLinks[0] },
      });
    });
  });

  describe("createPlayerLink", () => {
    it("should create one circuit", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            createPlayerLink(playerId: 1, type: "twitter", link: "anylink") {
              id
            }
          }`,
        });

      expect(response.body).toStrictEqual({
        data: { createPlayerLink: mockPlayerLinks[0] },
      });
    });
  });

  describe("updatePlayerLink", () => {
    it("should update one player link", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            updatePlayerLink(id: 1, link: "newNamePlayerLink") {
              id
            }
          }`,
        });

      expect(response.body).toStrictEqual({
        data: { updatePlayerLink: mockPlayerLinks[0] },
      });
    });
  });

  describe("deletePlayerLink", () => {
    it("should delete one player link", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            deletePlayerLink(id: 1) {
              id
            }
          }`,
        });

      expect(response.body).toStrictEqual({
        data: { deletePlayerLink: mockPlayerLinks[0] },
      });
    });
  });
});
