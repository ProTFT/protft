import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { LobbiesService } from "../lobbies/lobbies.service";
import { RoundsService } from "../rounds/rounds.service";
import { CreateStageArgs } from "./dto/create-stage.args";
import { UpdateStageArgs } from "./dto/update-stage.args";
import { UpdateTiebreakersArgs } from "./dto/update-tiebreakers.args";
import { Stage } from "./stage.entity";
import { StagesService } from "./stages.service";
import { getAll } from "./tiebreaker.logic";

describe("Stages service", () => {
  let service: StagesService;
  let stageRepository: Repository<Stage>;
  let roundsService: RoundsService;
  let lobbiesService: LobbiesService;

  const mockStageId = 1;
  const mockTournamentId = 2;
  const databaseResult = [
    { id: 1, name: "a" },
    { id: 2, name: "b" },
    { id: 3, name: "c" },
  ];

  beforeEach(() => {
    stageRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
      manager: {
        createQueryBuilder: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        distinct: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(databaseResult),
      },
    } as unknown as Repository<Stage>;

    roundsService = {
      createOne: jest.fn(),
      countByStage: jest.fn(),
    } as unknown as RoundsService;

    lobbiesService = {
      createManyLobbyGroup: jest.fn(),
      createMany: jest.fn(),
    } as unknown as LobbiesService;
    service = new StagesService(stageRepository, roundsService, lobbiesService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("findOne", () => {
    it("should call repository", async () => {
      const relations = ["anyRelation", "otherRelation"];

      await service.findOne(mockStageId, relations);

      expect(stageRepository.findOne).toHaveBeenCalledWith(mockStageId, {
        relations,
      });
    });
  });

  describe("findAllByTournament", () => {
    it("should call repository", async () => {
      await service.findAllByTournament(mockTournamentId);

      expect(stageRepository.find).toHaveBeenCalledWith({
        where: { tournamentId: mockTournamentId },
        order: { sequence: "ASC" },
      });
    });
  });

  describe("findPreviousStage", () => {
    it("should throw if passed stage is the first", async () => {
      const mockStage = {
        id: mockStageId,
        tournamentId: mockTournamentId,
      } as Stage;
      stageRepository.find = jest.fn().mockResolvedValue([
        {
          id: mockStageId,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ]);

      expect(
        async () => await service.findPreviousStage(mockStage),
      ).rejects.toThrowError(NotFoundException);
    });

    it("should return previous stage if is not the first", async () => {
      const mockStage = {
        id: mockStageId,
        tournamentId: mockTournamentId,
      } as Stage;
      stageRepository.find = jest.fn().mockResolvedValue([
        {
          id: 123,
        },
        {
          id: mockStageId,
        },
        {
          id: 456,
        },
      ]);

      const result = await service.findPreviousStage(mockStage);

      expect(result).toStrictEqual({
        id: 123,
      });
    });
  });

  describe("createOne", () => {
    it("should create stages and rounds related to it", async () => {
      const roundCount = 5;
      const payload = { roundCount } as CreateStageArgs;
      stageRepository.save = jest.fn().mockResolvedValue({
        id: 5,
        roundCount,
      });

      await service.createOne(payload);

      expect(stageRepository.save).toHaveBeenCalledWith(payload);
      expect(roundsService.createOne).toHaveBeenCalledTimes(roundCount);
    });
  });

  describe("updateOne", () => {
    it("if stage does not exist, should throw", async () => {
      const updatePayload = {
        name: "Test",
      } as UpdateStageArgs;
      stageRepository.findOne = jest.fn().mockResolvedValue(undefined);

      expect(
        async () =>
          await service.updateOne({ id: mockStageId, ...updatePayload }),
      ).rejects.toThrowError(NotFoundException);
    });

    it("should update stage and return it", async () => {
      const updatePayload = {
        name: "Test",
      } as UpdateStageArgs;
      stageRepository.findOne = jest.fn().mockResolvedValue({});

      await service.updateOne({ id: mockStageId, ...updatePayload });

      expect(stageRepository.update).toHaveBeenCalledWith(
        { id: mockStageId },
        updatePayload,
      );
      expect(stageRepository.findOne).toHaveBeenCalledTimes(2);
    });
  });

  describe("updateTiebreakers", () => {
    it("if stage does not exist, should throw", async () => {
      const updatePayload = {
        id: 1,
        tiebreakers: [1, 2, 3],
      } as UpdateTiebreakersArgs;
      stageRepository.findOne = jest.fn().mockResolvedValue(undefined);

      expect(
        async () => await service.updateTiebreakers(updatePayload),
      ).rejects.toThrowError(NotFoundException);
    });

    it("should update tiebreakers and return stage", async () => {
      const updatePayload = {
        id: 1,
        tiebreakers: [1, 2, 3],
      } as UpdateTiebreakersArgs;

      stageRepository.findOne = jest.fn().mockResolvedValue({});

      await service.updateTiebreakers(updatePayload);

      expect(stageRepository.update).toHaveBeenCalledWith(
        { id: mockStageId },
        { tiebreakers: [1, 2, 3] },
      );
      expect(stageRepository.findOne).toHaveBeenCalledTimes(2);
    });
  });

  describe("deleteOne", () => {
    it("should delete", async () => {
      const response = await service.deleteOne(mockStageId);

      expect(stageRepository.softDelete).toHaveBeenCalledWith({
        id: mockStageId,
      });
      expect(response).toStrictEqual(new DeleteResponse(mockStageId));
    });
  });

  describe("generateLobbies", () => {
    it("should create lobby groups and lobbies", async () => {
      const roundsPerLobbyGroup = 2;
      const playerCount = 32;
      roundsService.countByStage = jest.fn().mockResolvedValue(6);
      lobbiesService.createManyLobbyGroup = jest.fn().mockResolvedValue([
        { id: 1, sequence: 1 },
        { id: 2, sequence: 2 },
        { id: 3, sequence: 3 },
      ]);
      lobbiesService.createMany = jest
        .fn()
        .mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

      const response = await service.generateLobbies(
        mockStageId,
        roundsPerLobbyGroup,
        playerCount,
      );

      expect(lobbiesService.createManyLobbyGroup).toHaveBeenCalledWith([
        { roundsPlayed: 2, sequence: 1, stageId: mockStageId },
        { roundsPlayed: 2, sequence: 2, stageId: mockStageId },
        { roundsPlayed: 2, sequence: 3, stageId: mockStageId },
      ]);
      expect(lobbiesService.createMany).toHaveBeenCalledWith([
        { lobbyGroupId: 1, sequence: 1, stageId: mockStageId, name: "A1" },
        { lobbyGroupId: 1, sequence: 2, stageId: mockStageId, name: "B1" },
        { lobbyGroupId: 1, sequence: 3, stageId: mockStageId, name: "C1" },
        { lobbyGroupId: 1, sequence: 4, stageId: mockStageId, name: "D1" },
        { lobbyGroupId: 2, sequence: 1, stageId: mockStageId, name: "A2" },
        { lobbyGroupId: 2, sequence: 2, stageId: mockStageId, name: "B2" },
        { lobbyGroupId: 2, sequence: 3, stageId: mockStageId, name: "C2" },
        { lobbyGroupId: 2, sequence: 4, stageId: mockStageId, name: "D2" },
        { lobbyGroupId: 3, sequence: 1, stageId: mockStageId, name: "A3" },
        { lobbyGroupId: 3, sequence: 2, stageId: mockStageId, name: "B3" },
        { lobbyGroupId: 3, sequence: 3, stageId: mockStageId, name: "C3" },
        { lobbyGroupId: 3, sequence: 4, stageId: mockStageId, name: "D3" },
      ]);
      expect(response).toStrictEqual({
        createdLobbyGroups: 3,
        createdLobbies: 4,
      });
    });
  });

  describe("createStagePlayer", () => {
    it("should call repository", async () => {
      const mockPlayerIds = [1, 2, 3];
      stageRepository.findOne = jest.fn().mockResolvedValue({});

      await service.createStagePlayers({
        stageId: mockStageId,
        playerIds: mockPlayerIds,
      });

      expect(stageRepository.save).toHaveBeenCalledWith({
        players: [
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
        ],
      });
    });
  });

  describe("createStagePlayerByName", () => {
    it("should save three players if they are found on DB", async () => {
      const mockPlayerNames = `Ana
      Boris
      Camila`;
      stageRepository.findOne = jest.fn().mockResolvedValue({});

      await service.createStagePlayerByName({
        stageId: mockStageId,
        playerNames: mockPlayerNames,
      });

      expect(stageRepository.save).toHaveBeenCalledWith({
        players: [
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
        ],
      });
    });

    it("should throw if cant find some player in DB", async () => {
      const mockPlayerNames = `Ana
        Boris
        Camila
        Denis`;

      stageRepository.findOne = jest.fn().mockResolvedValue({});

      expect(
        async () =>
          await service.createStagePlayerByName({
            stageId: mockStageId,
            playerNames: mockPlayerNames,
          }),
      ).rejects.toThrowError("Provided names: 4, names found: 3");
      expect(stageRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("findTiebreakers", () => {
    it("should get static data", () => {
      const response = service.findTiebreakers();
      expect(response).toStrictEqual(getAll());
    });
  });

  describe("applyTiebreakersToAll", () => {
    it("should save all related stages", async () => {
      const mockOtherStageId = 345;
      const mockAnotherStageId = 678;
      const tiebreakers = [1, 2, 3];

      stageRepository.findOne = jest.fn().mockResolvedValue({
        tournamentId: mockTournamentId,
        tiebreakers,
      });
      stageRepository.find = jest
        .fn()
        .mockResolvedValue([
          { id: mockStageId },
          { id: mockOtherStageId },
          { id: mockAnotherStageId },
        ]);
      await service.applyTiebreakersToAll({ stageId: mockStageId });
      expect(stageRepository.save).toHaveBeenCalledWith([
        { id: mockStageId, tiebreakers },
        { id: mockOtherStageId, tiebreakers },
        { id: mockAnotherStageId, tiebreakers },
      ]);
    });
  });
});
