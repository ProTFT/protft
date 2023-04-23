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
          { player: { name: "lele", alias: [] } },
          { player: { name: "pedro", alias: [] } },
        ]);
      const fileString = formatString(`
            Name,Ranking,ExtraPoints
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
          { player: { name: "lucas", alias: [] } },
          { player: { name: "pedro", alias: [] } },
        ]);
      const fileString = formatString(`
            Name,Ranking,ExtraPoints
            Lucas,1
            Pedro,2
          `);
      await service.createTiebreakerBulk(fileString, mockPlayerId);

      expect(stagePlayerInfoRepository.update).toHaveBeenCalled();
    });

    it("should update if name does not match but alias does", async () => {
      stagePlayerInfoRepository.find = jest
        .fn()
        .mockResolvedValue([
          { player: { name: "lukinhas2023", alias: ["lucas"] } },
          { player: { name: "pedro", alias: [] } },
        ]);
      const fileString = formatString(`
            Name,Ranking,ExtraPoints
            Lucas,1
            Pedro,2
          `);
      await service.createTiebreakerBulk(fileString, mockPlayerId);

      expect(stagePlayerInfoRepository.update).toHaveBeenCalled();
    });

    it("if extra points are not passed, should not update them", async () => {
      stagePlayerInfoRepository.find = jest
        .fn()
        .mockResolvedValue([
          { player: { id: 1, name: "lucas", alias: [] } },
          { player: { id: 2, name: "pedro", alias: [] } },
        ]);
      const fileString = formatString(`
            Name,Ranking,ExtraPoints
            Lucas,1
            Pedro,2
          `);
      await service.createTiebreakerBulk(fileString, mockStageId);

      expect(stagePlayerInfoRepository.update).toHaveBeenCalledWith(
        {
          playerId: 1,
          stageId: mockStageId,
        },
        { tiebreakerRanking: 1 },
      );
      expect(stagePlayerInfoRepository.update).toHaveBeenCalledWith(
        {
          playerId: 2,
          stageId: mockStageId,
        },
        { tiebreakerRanking: 2 },
      );
    });

    it("if tiebreakers are not passed, should not update them", async () => {
      stagePlayerInfoRepository.find = jest
        .fn()
        .mockResolvedValue([
          { player: { id: 1, name: "lucas", alias: [] } },
          { player: { id: 2, name: "pedro", alias: [] } },
        ]);
      const fileString = formatString(`
            Name,Ranking,ExtraPoints
            Lucas,,1
            Pedro,,2
          `);
      await service.createTiebreakerBulk(fileString, mockStageId);

      expect(stagePlayerInfoRepository.update).toHaveBeenCalledWith(
        {
          playerId: 1,
          stageId: mockStageId,
        },
        { extraPoints: 1 },
      );
      expect(stagePlayerInfoRepository.update).toHaveBeenCalledWith(
        {
          playerId: 2,
          stageId: mockStageId,
        },
        { extraPoints: 2 },
      );
    });
  });

  describe("updatePlayer", () => {
    it("should call repository", async () => {
      await service.updatePlayer(10, 11);
      expect(stagePlayerInfoRepository.update).toHaveBeenCalledWith(
        { playerId: 10 },
        { playerId: 11 },
      );
    });
  });
});
