import { Repository } from "typeorm";
import { CreateServerDto } from "./dto/create-server.dto";
import { Server } from "./server.entity";
import { ServersService } from "./servers.service";

const serversRepository = {
  save: jest.fn(),
  find: jest.fn(),
} as unknown as Repository<Server>;

const mockServer: CreateServerDto = {
  name: "",
  code: "",
  apiMajorRegion: "",
  apiMinorRegion: "",
};

describe("ServersService", () => {
  let service: ServersService;

  beforeEach(async () => {
    service = new ServersService(serversRepository);
  });

  describe("createOne", () => {
    it("should call save", async () => {
      await service.createOne(mockServer);
      expect(serversRepository.save).toHaveBeenCalled();
    });
  });

  describe("findAll", () => {
    it("should call repo find", async () => {
      await service.findAll();
      expect(serversRepository.find).toHaveBeenCalled();
    });
  });
});
