import { PointSchemasResolver } from "./points.resolver";
import { PointSchemasService } from "./points.service";

describe("Points resolver", () => {
  const pointSchemaService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  } as unknown as PointSchemasService;
  let resolver: PointSchemasResolver;

  beforeEach(() => {
    resolver = new PointSchemasResolver(pointSchemaService);
  });

  describe("pointSchemas", () => {
    it("should get all point schemas", async () => {
      await resolver.pointSchemas();
      expect(pointSchemaService.findAll).toHaveBeenCalled();
    });
  });

  describe("pointSchema", () => {
    it("should get one point schemas", async () => {
      await resolver.pointSchema(1);
      expect(pointSchemaService.findOne).toHaveBeenCalled();
    });
  });
});
