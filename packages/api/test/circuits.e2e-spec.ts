import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CircuitsResolver } from "../src/circuits/circuits.resolver";
import { CircuitsService } from "../src/circuits/circuits.service";
import { SetsService } from "../src/sets/sets.service";
import { GqlJwtAuthGuard } from "../src/auth/jwt-auth.guard";

const graphql = "/graphql";

const mockCircuits = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const mockSet = {
  id: 5,
};

const circuitsService = {
  findAll: jest.fn().mockResolvedValue(mockCircuits),
  findOne: jest.fn().mockResolvedValue(mockCircuits[0]),
  createOne: jest.fn().mockResolvedValue(mockCircuits[0]),
  updateOne: jest.fn().mockResolvedValue(mockCircuits[0]),
  deleteOne: jest.fn().mockResolvedValue(mockCircuits[0]),
};

const setsService = {
  findOne: jest.fn().mockResolvedValue(mockSet),
};

describe("Circuits (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
      ],
      providers: [CircuitsResolver, CircuitsService, SetsService],
    })
      .overrideProvider(CircuitsService)
      .useValue(circuitsService)
      .overrideProvider(SetsService)
      .useValue(setsService)
      .overrideGuard(GqlJwtAuthGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("circuits", () => {
    it("should get data from service", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            circuits {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { circuits: mockCircuits },
      });
    });
  });

  describe("circuit", () => {
    it("should get one circuit", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          query {
            circuit(id: 1) {
              id
              set {
                id
              }
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { circuit: { ...mockCircuits[0], set: mockSet } },
      });
    });
  });

  describe("createCircuit", () => {
    it("should create one circuit", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            createCircuit(name: "circuit", region: ["NA"], setId: 9) {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { createCircuit: mockCircuits[0] },
      });
    });
  });

  describe("updateCircuit", () => {
    it("should update one circuit", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            updateCircuit(id: 1, name: "newNamecircuit") {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { updateCircuit: mockCircuits[0] },
      });
    });
  });

  describe("deleteCircuit", () => {
    it("should delete one circuit", async () => {
      const response = await request(app.getHttpServer())
        .post(graphql)
        .send({
          query: `
          mutation {
            deleteCircuit(id: 1) {
              id
            }
          }`,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual({
        data: { deleteCircuit: mockCircuits[0] },
      });
    });
  });
});
