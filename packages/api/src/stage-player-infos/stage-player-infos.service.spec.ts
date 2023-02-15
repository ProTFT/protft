import { Repository } from "typeorm";
import { formatString } from "../../test/helpers/File";
import { StagePlayerInfo } from "./stage-player-info.entity";
import { StagePlayerInfosService } from "./stage-player-infos.service";

describe("StagePlayerInfos service", () => {
  let service: StagePlayerInfosService;
  const databaseResult = [
    { id: 1, name: "a" },
    { id: 2, name: "b" },
    { id: 3, name: "c" },
  ];
  let stagePlayerInfoRepository: Repository<StagePlayerInfo>;
  const mockStageId = 1;
  const mockPlayerId = 2;

  beforeEach(() => {
    stagePlayerInfoRepository = {
      find: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      manager: {
        createQueryBuilder: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(databaseResult),
      },
    } as unknown as Repository<StagePlayerInfo>;
    service = new StagePlayerInfosService(stagePlayerInfoRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("findAllByStage", () => {
    it("should call repository", async () => {
      await service.findAllByStage(mockStageId);
      expect(stagePlayerInfoRepository.find).toHaveBeenCalledWith({
        relations: ["player"],
        where: { stageId: mockStageId },
      });
    });
  });

  describe("getOne", () => {
    it("should call repository", async () => {
      await service.findOne({ stageId: mockStageId, playerId: mockPlayerId });
      expect(stagePlayerInfoRepository.findOne).toHaveBeenCalledWith({
        where: { stageId: mockStageId, playerId: mockPlayerId },
      });
    });
  });

  describe("updateOne", () => {
    it("should call repository", async () => {
      await service.updateOne({
        stageId: mockStageId,
        playerId: mockPlayerId,
        extraPoints: 10,
      });
      expect(stagePlayerInfoRepository.update).toHaveBeenCalledWith(
        { stageId: mockStageId, playerId: mockPlayerId },
        { extraPoints: 10 },
      );
      expect(stagePlayerInfoRepository.findOne).toHaveBeenCalled();
    });
  });

  describe("createStagePlayer", () => {
    it("should call repository", async () => {
      const mockPlayerIds = [1, 2, 3];
      await service.createStagePlayers({
        stageId: mockStageId,
        playerIds: mockPlayerIds,
      });
      expect(stagePlayerInfoRepository.save).toHaveBeenCalledWith([
        {
          stageId: mockStageId,
          playerId: 1,
          extraPoints: 0,
          tiebreakerRanking: 0,
        },
        {
          stageId: mockStageId,
          playerId: 2,
          extraPoints: 0,
          tiebreakerRanking: 0,
        },
        {
          stageId: mockStageId,
          playerId: 3,
          extraPoints: 0,
          tiebreakerRanking: 0,
        },
      ]);
    });
  });

  describe("createStagePlayerByName", () => {
    it("should save three players if they are found on DB", async () => {
      const mockPlayerNames = `Ana
      Boris
      Camila`;
      await service.createStagePlayerByName({
        stageId: mockStageId,
        playerNames: mockPlayerNames,
      });
      expect(stagePlayerInfoRepository.save).toHaveBeenCalledWith([
        {
          stageId: mockStageId,
          playerId: 1,
          extraPoints: 0,
          tiebreakerRanking: 0,
        },
        {
          stageId: mockStageId,
          playerId: 2,
          extraPoints: 0,
          tiebreakerRanking: 0,
        },
        {
          stageId: mockStageId,
          playerId: 3,
          extraPoints: 0,
          tiebreakerRanking: 0,
        },
      ]);
    });

    it("should throw if cant find some player in DB", async () => {
      const mockPlayerNames = `Ana
        Boris
        Camila
        Denis`;
      expect(
        async () =>
          await service.createStagePlayerByName({
            stageId: mockStageId,
            playerNames: mockPlayerNames,
          }),
      ).rejects.toThrowError("Provided names: 4, names found: 3");
      expect(stagePlayerInfoRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("createTiebreakerBulk", () => {
    it("if file does not have correct headers, should throw error", async () => {
      const fileString = formatString(`
        Name,Lala
        Lucas,1
        Pedro,2
      `);
      expect(
        async () => await service.createTiebreakerBulk(fileString, mockStageId),
      ).rejects.toThrowError(`Name - Lala`);
    });

    it("if some name does not exist on database, should throw", async () => {
      stagePlayerInfoRepository.find = jest
        .fn()
        .mockResolvedValue([
          { player: { name: "lele" } },
          { player: { name: "pedro" } },
        ]);
      const fileString = formatString(`
            Name,Ranking
            Lucas,1
            Pedro,2
          `);
      expect(
        async () =>
          await service.createTiebreakerBulk(fileString, mockPlayerId),
      ).rejects.toThrowError("Names not found: lele");
    });

    it("should update", async () => {
      stagePlayerInfoRepository.find = jest
        .fn()
        .mockResolvedValue([
          { player: { name: "lucas" } },
          { player: { name: "pedro" } },
        ]);
      const fileString = formatString(`
            Name,Ranking
            Lucas,1
            Pedro,2
          `);
      await service.createTiebreakerBulk(fileString, mockPlayerId);

      expect(stagePlayerInfoRepository.update).toHaveBeenCalled();
    });
  });
});
