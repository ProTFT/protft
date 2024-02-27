import { Repository } from "typeorm";
import { SetsService } from "../sets/sets.service";
import { Circuit } from "./circuit.entity";
import { CircuitsService } from "./circuits.service";

describe("Circuits Service", () => {
  const SAVED_CIRCUIT_ID = 123;

  let service: CircuitsService;
  const setsService: SetsService = {} as unknown as SetsService;
  const circuitsRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest
      .fn()
      .mockImplementation((payload) => ({ ...payload, id: SAVED_CIRCUIT_ID })),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as Repository<Circuit>;

  beforeEach(() => {
    service = new CircuitsService(circuitsRepository, setsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should call repository", async () => {
      await service.findAll();
      expect(circuitsRepository.find).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should call repository", async () => {
      await service.findOne(1);
      expect(circuitsRepository.findOne).toHaveBeenCalled();
    });
  });

  describe("createOne", () => {
    it("should create circuit and then save slug", async () => {
      setsService.findOne = jest
        .fn()
        .mockResolvedValue({ id: 1, name: "setName" });

      await service.createOne({ name: "test", region: ["NA"], setId: 1 });

      expect(circuitsRepository.save).toHaveBeenCalled();
      expect(circuitsRepository.update).toHaveBeenCalledWith(
        { id: SAVED_CIRCUIT_ID },
        {
          slug: "setname-na-test",
        },
      );
    });

    it("should work for circuits spanning more than one region", async () => {
      setsService.findOne = jest
        .fn()
        .mockResolvedValue({ id: 1, name: "setName" });

      await service.createOne({
        name: "test",
        region: ["NA", "EMEA"],
        setId: 1,
      });

      expect(circuitsRepository.save).toHaveBeenCalled();
      expect(circuitsRepository.update).toHaveBeenCalledWith(
        { id: SAVED_CIRCUIT_ID },
        {
          slug: "setname-na-emea-test",
        },
      );
    });
  });

  describe("updateOne", () => {
    it("should update", async () => {
      const [id, name] = [1, "test"];
      await service.updateOne({
        id,
        name,
      });

      expect(circuitsRepository.update).toHaveBeenCalledWith({ id }, { name });
    });

    it("if region or setId is null/undefined, should not update", async () => {
      const [id, name, setId, region] = [1, "test", null, undefined];
      await service.updateOne({
        id,
        name,
        setId,
        region,
      });

      expect(circuitsRepository.update).toHaveBeenCalledWith({ id }, { name });
    });
  });

  describe("deleteOne", () => {
    it("should delete", async () => {
      const id = 1;
      await service.deleteOne({
        id,
      });

      expect(circuitsRepository.delete).toHaveBeenCalledWith({ id });
    });
  });
});
