import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { SetsService } from "../sets/sets.service";
import { StagesService } from "../stages/stages.service";
import { CreateTournamentArgs } from "./dto/create-tournament.args";
import { UpdateTournamentArgs } from "./dto/update-tournament.args";
import { Tournament } from "./tournament.entity";
import { TournamentRepository } from "./tournament.repository";
import { TournamentsService } from "./tournaments.service";
import { Settings } from "luxon";
jest.mock("./tournament.repository");

describe("TournamentsService", () => {
  let service: TournamentsService;
  let tournamentRepository: Repository<Tournament>;
  let setsService: SetsService;
  let stagesService: StagesService;
  let findWithPaginationSpy: jest.SpyInstance;
  const mockTournamentId = 1;
  const searchQuery = "test";

  beforeEach(() => {
    findWithPaginationSpy = jest.spyOn(
      TournamentRepository.prototype,
      "findWithPagination",
    );
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
    stagesService = {} as unknown as StagesService;
    service = new TournamentsService(
      tournamentRepository,
      setsService,
      stagesService,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should get only visible tournaments ordered by startDate", async () => {
      await service.findAll({ searchQuery });

      expect(findWithPaginationSpy).toHaveBeenCalledWith(
        { searchQuery },
        undefined,
        {
          onlyVisible: true,
          sorting: { startDate: "DESC" },
        },
      );
    });
  });

  describe("findOne", () => {
    it("should call repository", async () => {
      await service.findOne(mockTournamentId);

      expect(tournamentRepository.findOne).toHaveBeenCalledWith(
        mockTournamentId,
        { relations: undefined },
      );
    });

    it("should send relations", async () => {
      const relations = ["anyRelation"];
      await service.findOne(mockTournamentId, relations);

      expect(tournamentRepository.findOne).toHaveBeenCalledWith(
        mockTournamentId,
        { relations },
      );
    });
  });

  describe("findOneBySlug", () => {
    it("should call repository", async () => {
      const slug = "slug";
      await service.findOneBySlug(slug);

      expect(tournamentRepository.findOne).toHaveBeenCalledWith({ slug });
    });
  });

  describe("findPast", () => {
    it("should call get only visible tournaments sorted by end date", async () => {
      await service.findPast({ searchQuery });

      expect(findWithPaginationSpy).toHaveBeenCalledWith(
        { searchQuery },
        undefined,
        {
          condition: {
            endDate: expect.anything(),
          },
          sorting: { endDate: "DESC" },
        },
      );
    });
  });

  describe("findWithStats", () => {
    it("should call past and ongoing", async () => {
      const tournaments = [
        {
          id: mockTournamentId,
          name: "anyName",
          players: [],
        },
        {
          id: 2,
          name: "anyName",
          players: [],
        },
      ];
      tournamentRepository.find = jest.fn().mockResolvedValue(tournaments);
      findWithPaginationSpy.mockResolvedValueOnce(tournaments);
      const response = await service.findWithStats();

      expect(tournamentRepository.find).toHaveBeenCalled();
      expect(findWithPaginationSpy).toHaveBeenCalled();
      expect(response).toStrictEqual([...tournaments, ...tournaments]);
    });
  });

  describe("findOngoing", () => {
    it("should call repository", async () => {
      await service.findOngoing();

      expect(tournamentRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            startDate: expect.anything(),
            endDate: expect.anything(),
            visibility: true,
          }),
          order: expect.objectContaining({
            startDate: "DESC",
          }),
        }),
      );
    });
  });

  describe("findUpcoming", () => {
    it("should filter by start date and sort by start date ASC", async () => {
      await service.findUpcoming({ searchQuery });

      expect(findWithPaginationSpy).toHaveBeenCalledWith(
        { searchQuery },
        undefined,
        {
          condition: {
            startDate: expect.anything(),
          },
          sorting: { startDate: "ASC" },
        },
      );
    });
  });

  describe("findNextStageStartTime", () => {
    const hoursToMs = (hours: number) => minutesToMs(hours * 60);
    const minutesToMs = (minutes: number) => minutes * 60 * 1000;
    const dateIn2022 = new Date(2022, 1, 1);
    const dateIn2023 = new Date(2023, 5, 31);

    it("if now() is past tournament date, should return 0", async () => {
      const tournament = {
        id: 1,
        endDate: dateIn2022,
      } as Tournament;
      Settings.now = () => dateIn2023.valueOf();

      const response = await service.findNextStageStartTime(tournament);

      expect(response).toBe(0);
    });

    it("if now() is 23 hours before, should return 23 hours in ms", async () => {
      const tournament = {
        id: 1,
        endDate: new Date(2023, 5, 2, 13),
      } as Tournament;
      Settings.now = () => new Date(2023, 5, 1, 12, 0, 0).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          startDateTime: new Date(2023, 5, 2, 11, 0, 0).toISOString(),
          rounds: [{}],
        },
      ]);

      const response = await service.findNextStageStartTime(tournament);

      expect(response).toBe(hoursToMs(23));
    });

    it("if now() is 30 minutes before, should return 30 minutes in ms", async () => {
      const tournament = {
        id: 1,
        endDate: new Date(2023, 5, 2, 13),
      } as Tournament;
      Settings.now = () => new Date(2023, 5, 1, 12, 0, 0).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          startDateTime: new Date(2023, 5, 1, 12, 30, 0).toISOString(),
          rounds: [{}],
        },
      ]);

      const response = await service.findNextStageStartTime(tournament);

      expect(response).toBe(minutesToMs(30));
    });

    it("if now() is 30 minutes after, should return negative", async () => {
      const tournament = {
        id: 1,
        endDate: new Date(2023, 5, 2, 13),
      } as Tournament;
      Settings.now = () => new Date(2023, 5, 1, 13, 0, 0).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          startDateTime: new Date(2023, 5, 1, 12, 30, 0).toISOString(),
          rounds: [{}],
        },
      ]);

      const response = await service.findNextStageStartTime(tournament);

      expect(response).toBeLessThan(0);
    });

    it("if now() is 1h30 after, has one round but no next stage, should return 0", async () => {
      const tournament = {
        id: 1,
        endDate: new Date(2023, 5, 2, 13),
      } as Tournament;
      Settings.now = () => new Date(2023, 5, 1, 14, 0, 0).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          startDateTime: new Date(2023, 5, 1, 12, 30, 0).toISOString(),
          rounds: [{}],
        },
      ]);

      const response = await service.findNextStageStartTime(tournament);

      expect(response).toBe(0);
    });

    it("if now() is 1h30 after, has one round, and has next stage should return the next stage countdown", async () => {
      const tournament = {
        id: 1,
        endDate: new Date(2023, 5, 2, 13),
      } as Tournament;
      Settings.now = () => new Date(2023, 5, 1, 14, 0, 0).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          startDateTime: new Date(2023, 5, 1, 12, 30, 0).toISOString(),
          rounds: [{}],
        },
        {
          startDateTime: new Date(2023, 5, 1, 16, 0, 0).toISOString(),
          rounds: [{}],
        },
      ]);

      const response = await service.findNextStageStartTime(tournament);

      expect(response).toBe(hoursToMs(2));
    });

    it("if now() is 1h30 after, but has two rounds, should be negative", async () => {
      const tournament = {
        id: 1,
        endDate: new Date(2023, 5, 2, 13),
      } as Tournament;
      Settings.now = () => new Date(2023, 5, 1, 14, 0, 0).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          startDateTime: new Date(2023, 5, 1, 12, 30, 0).toISOString(),
          rounds: [{}, {}],
        },
        {
          startDateTime: new Date(2023, 5, 1, 16, 0, 0).toISOString(),
          rounds: [{}],
        },
      ]);

      const response = await service.findNextStageStartTime(tournament);

      expect(response).toBeLessThan(0);
    });
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
