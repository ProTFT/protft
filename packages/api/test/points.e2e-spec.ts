import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PointSchemasResolver } from "../src/points/points.resolver";
import { PointSchemasService } from "../src/points/points.service";

const graphql = "/graphql";

const mockPointSchemas = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const pointSchemasService = {
  findAll: jest.fn().mockResolvedValue(mockPointSchemas),
  findOne: jest.fn().mockResolvedValue(mockPointSchemas[0]),
};

describe("Points (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
      ],
      providers: [PointSchemasResolver, PointSchemasService],
    })
      .overrideProvider(PointSchemasService)
      .useValue(pointSchemasService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("pointSchemas", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            pointSchemas {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { pointSchemas: mockPointSchemas },
      });
    });
  });

  describe("pointSchema", () => {
    it("should get players in descending ID order", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            pointSchema(id: 1) {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { pointSchema: mockPointSchemas[0] },
      });
    });
  });
});
