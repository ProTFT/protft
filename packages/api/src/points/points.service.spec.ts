import { Repository } from "typeorm";
import { PointSchema } from "./point.entity";
import { PointSchemasService } from "./points.service";

describe("PointSchemas Service", () => {
  let service: PointSchemasService;
  const pointSchemaRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  } as unknown as Repository<PointSchema>;

  beforeEach(() => {
    service = new PointSchemasService(pointSchemaRepository);
  });

  describe("findAll", () => {
    it("should call repository", async () => {
      await service.findAll();
      expect(pointSchemaRepository.find).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should call repository", async () => {
      await service.findOne(1);
      expect(pointSchemaRepository.findOne).toHaveBeenCalled();
    });
  });
});
