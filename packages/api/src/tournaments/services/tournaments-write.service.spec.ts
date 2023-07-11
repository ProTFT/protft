import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { DeleteResponse } from "../../lib/dto/delete-return";
import { SetsService } from "../../sets/sets.service";
import { StagesService } from "../../stages/stages.service";
import { StageType } from "../../stages/types/StageType";
import { Tournament } from "../entities/tournament.entity";
import { CreateTournamentArgs } from "../gql/create-tournament.args";
import { UpdateTournamentArgs } from "../gql/update-tournament.args";
import { CreateTournamentStageBodySchemaDto } from "../schema/create-stage.schema";
import { TournamentsWriteService } from "./tournaments-write.service";

describe("TournamentsWriteService", () => {
  let service: TournamentsWriteService;
  let tournamentRepository: Repository<Tournament>;
  let setsService: SetsService;
  let stagesService: StagesService;
  const mockTournamentId = 1;

  beforeEach(() => {
    tournamentRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([{}]),
      manager: {
        createQueryBuilder: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([
          { id: 1, name: "a" },
          { id: 2, name: "b" },
          { id: 3, name: "c" },
        ]),
      },
    } as unknown as Repository<Tournament>;
    setsService = {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: "setName" }),
    } as unknown as SetsService;
    stagesService = {
      createOne: jest.fn(),
    } as unknown as StagesService;
    service = new TournamentsWriteService(
      tournamentRepository,
      setsService,
      stagesService,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("createOne", () => {
    const payload = {
      name: "tournamentName",
      region: "regionName",
    } as unknown as CreateTournamentArgs;

    const defaultCreationParameters = {
      visibility: false,
    };

    it("should save and return", async () => {
      await service.createOne(payload);

      expect(tournamentRepository.save).toHaveBeenCalledWith({
        ...defaultCreationParameters,
        ...payload,
        slug: "setname-regionname-tournamentname",
      });
    });
  });

  describe("createStage", () => {
    const tournamentId = 1;
    const payload = {
      name: "name",
      pointSchemaId: 1,
      roundCount: 1,
      sequence: 1,
      stageType: StageType.RANKING,
      tiebreakers: [1, 2, 3],
      description: "descr",
      qualifiedCount: 23,
    } as CreateTournamentStageBodySchemaDto;

    it("if tournament does not exist, should throw", async () => {
      tournamentRepository.findOne = jest.fn().mockResolvedValueOnce(undefined);

      expect(
        async () => await service.createStage(tournamentId, payload),
      ).rejects.toThrowError(BadRequestException);
    });

    it("should save and return", async () => {
      tournamentRepository.findOne = jest.fn().mockResolvedValueOnce({});

      await service.createStage(tournamentId, payload);

      expect(stagesService.createOne).toHaveBeenCalledWith({
        tournamentId,
        ...payload,
      });
    });
  });

  describe("updateOne", () => {
    const payload = {
      id: mockTournamentId,
      name: "test",
    } as UpdateTournamentArgs;
    it("should throw error if tournament does not exist", async () => {
      tournamentRepository.findOne = jest.fn().mockResolvedValue(undefined);

      expect(async () => await service.updateOne(payload)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it("should save and return", async () => {
      tournamentRepository.findOne = jest.fn().mockResolvedValue({});

      await service.updateOne(payload);

      expect(tournamentRepository.update).toHaveBeenCalledWith(
        { id: mockTournamentId },
        { name: "test" },
      );
      expect(tournamentRepository.findOne).toHaveBeenCalled();
    });
  });

  describe("deleteOne", () => {
    it("should delete", async () => {
      const response = await service.deleteOne(mockTournamentId);

      expect(response).toStrictEqual(new DeleteResponse(mockTournamentId));
    });
  });

  describe("createTournamentPlayer", () => {
    it("if tournament does not exist, should throw", async () => {
      tournamentRepository.findOne = jest.fn().mockResolvedValue(undefined);

      expect(async () =>
        service.createTournamentPlayers({
          tournamentId: mockTournamentId,
          playerIds: [1, 2, 3],
        }),
      ).rejects.toThrowError(NotFoundException);
    });

    it("should add player to tournament object", async () => {
      const tournament = {
        id: mockTournamentId,
        name: "anyName",
        players: [],
      };
      tournamentRepository.findOne = jest.fn().mockResolvedValue(tournament);

      await service.createTournamentPlayers({
        tournamentId: mockTournamentId,
        playerIds: [1, 2, 3],
      });

      expect(tournamentRepository.save).toHaveBeenCalledWith({
        ...tournament,
        players: [{ id: 1 }, { id: 2 }, { id: 3 }],
      });
    });
  });

  describe("createTournamentPlayerByName", () => {
    it("should save three players if they are found on DB", async () => {
      const mockPlayerNames = `Ana
        Boris
        Camila`;
      const tournament = {
        id: mockTournamentId,
        name: "anyName",
        players: [],
      };
      tournamentRepository.findOne = jest.fn().mockResolvedValue(tournament);

      await service.createTournamentPlayersByName({
        tournamentId: mockTournamentId,
        playerNames: mockPlayerNames,
      });

      expect(tournamentRepository.save).toHaveBeenCalledWith({
        ...tournament,
        players: [{ id: 1 }, { id: 2 }, { id: 3 }],
      });
    });

    it("should throw if cant find some player in DB", async () => {
      const mockPlayerNames = `Ana
          Boris
          Camila
          Denis`;
      expect(
        async () =>
          await service.createTournamentPlayersByName({
            tournamentId: mockTournamentId,
            playerNames: mockPlayerNames,
          }),
      ).rejects.toThrowError("Provided names: 4, names found: 3");
      expect(tournamentRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("createMissingSlugs", () => {
    it("should create slug using info from tournament and set", async () => {
      tournamentRepository.find = jest.fn().mockResolvedValue([
        {
          id: mockTournamentId,
          region: "EMEA",
          name: "Tournament Name",
          set: {
            id: 1,
            name: "Gizmos and Gadgets",
          },
        },
      ]);

      await service.createMissingSlugs();

      expect(tournamentRepository.update).toHaveBeenCalledWith(
        {
          id: mockTournamentId,
        },
        {
          slug: "gizmos-and-gadgets-emea-tournament-name",
        },
      );
    });

    it("if set is not loaded, should load it", async () => {
      tournamentRepository.find = jest.fn().mockResolvedValue([
        {
          id: mockTournamentId,
          region: "EMEA",
          name: "Tournament Name",
          set: undefined,
        },
      ]);

      await service.createMissingSlugs();

      expect(setsService.findOne).toHaveBeenCalled();
      expect(tournamentRepository.update).toHaveBeenCalledWith(
        {
          id: mockTournamentId,
        },
        {
          slug: "setname-emea-tournament-name",
        },
      );
    });

    it("should create slug for several tournaments", async () => {
      tournamentRepository.find = jest.fn().mockResolvedValue([
        {
          id: mockTournamentId,
          region: "EMEA",
          name: "Tournament Name",
          set: {
            id: 1,
            name: "Gizmos and Gadgets",
          },
        },
        {
          id: mockTournamentId,
          region: "EMEA",
          name: "Tournament Name",
          set: {
            id: 1,
            name: "Gizmos and Gadgets",
          },
        },
        {
          id: mockTournamentId,
          region: "EMEA",
          name: "Tournament Name",
          set: {
            id: 1,
            name: "Gizmos and Gadgets",
          },
        },
      ]);

      await service.createMissingSlugs();

      expect(tournamentRepository.update).toHaveBeenCalledTimes(3);
    });
  });

  describe("updatePlayer", () => {
    it("should not save if player is not in a tournament", async () => {
      const playerToBeRemoved = { id: 10 };
      const playerToBeAdded = { id: 11 };

      (tournamentRepository as any).getMany = jest.fn().mockResolvedValue([]);

      await service.updatePlayer(playerToBeRemoved.id, playerToBeAdded.id);

      expect(tournamentRepository.save).toHaveBeenCalledTimes(0);
    });

    it("should call save updating the player ID", async () => {
      const tournamentData = {
        id: 1,
        name: "Test",
      };
      const playerToBeRemoved = { id: 10 };
      const playerToBeAdded = { id: 11 };
      const randomPlayer = { id: 2 };
      tournamentRepository.find = jest.fn().mockResolvedValue([
        {
          ...tournamentData,
          players: [playerToBeRemoved, randomPlayer],
        },
      ]);
      await service.updatePlayer(playerToBeRemoved.id, playerToBeAdded.id);

      expect(tournamentRepository.save).toHaveBeenCalledWith({
        ...tournamentData,
        players: [randomPlayer, playerToBeAdded],
      });
    });
  });
});
