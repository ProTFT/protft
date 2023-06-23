import { Repository } from "typeorm";
import { PlayerLink } from "./player-link.entity";
import { PlayerLinksService } from "./player-links.service";

describe("Player Links Service", () => {
  const SAVED_PLAYER_LINK_ID = 123;

  let service: PlayerLinksService;
  const playerLinksRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn().mockImplementation((payload) => ({
      ...payload,
      id: SAVED_PLAYER_LINK_ID,
    })),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as Repository<PlayerLink>;

  beforeEach(() => {
    service = new PlayerLinksService(playerLinksRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getByPlayerId", () => {
    it("should call repository", async () => {
      const playerId = 1;
      await service.getByPlayerId(playerId);
      expect(playerLinksRepository.find).toHaveBeenCalledWith({ playerId });
    });
  });

  describe("createOne", () => {
    it("should create circuit and then save slug", async () => {
      await service.createOne({ link: "link", playerId: 1, type: "type" });

      expect(playerLinksRepository.save).toHaveBeenCalled();
    });
  });

  describe("updateOne", () => {
    it("should update", async () => {
      const [id, link] = [1, "teststs"];
      await service.updateOne({
        id,
        link,
      });

      expect(playerLinksRepository.update).toHaveBeenCalledWith(
        { id },
        { link },
      );
    });
  });

  describe("deleteOne", () => {
    it("should delete", async () => {
      const id = 1;
      await service.deleteOne({
        id,
      });

      expect(playerLinksRepository.delete).toHaveBeenCalledWith({ id });
    });
  });
});
