import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { SetsResolver } from "../src/sets/sets.resolver";
import { SetsService } from "../src/sets/sets.service";

const graphql = "/graphql";

const mockSets = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const fakeSetsService = {
  findAll: jest.fn().mockResolvedValue(mockSets),
  findOne: jest.fn().mockResolvedValue(mockSets[0]),
};

describe("Sets (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
      ],
      providers: [SetsResolver, SetsService],
    })
      .overrideProvider(SetsService)
      .useValue(fakeSetsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("sets", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            sets {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { sets: mockSets },
      });
    });
  });

  describe("set", () => {
    it("should get one set", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            set(id: 1) {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { set: mockSets[0] },
      });
    });
  });
});
