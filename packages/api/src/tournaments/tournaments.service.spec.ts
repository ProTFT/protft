import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { SetsService } from "../sets/sets.service";
import { CreateTournamentArgs } from "./dto/create-tournament.args";
import { UpdateTournamentArgs } from "./dto/update-tournament.args";
import { Tournament } from "./tournament.entity";
import { TournamentsService } from "./tournaments.service";

describe("TournamentsService", () => {
  let service: TournamentsService;
  let tournamentRepository: Repository<Tournament>;
  let setsService: SetsService;
  const mockTournamentId = 1;
  const searchQuery = "test";

  beforeEach(() => {
    tournamentRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      save: jest.fn(),
      manager: {
        createQueryBuilder: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getRawMany: jest
          .fn()
          .mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]),
      },
    } as unknown as Repository<Tournament>;
    setsService = {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: "setName" }),
    } as unknown as SetsService;
    service = new TournamentsService(tournamentRepository, setsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should get only visible tournaments by default", async () => {
      await service.findAll(searchQuery);

      expect(tournamentRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            visibility: true,
            name: expect.anything(),
          }),
          order: expect.objectContaining({
            startDate: "DESC",
          }),
        }),
      );
    });

    it("should get all tournaments based on parameter", async () => {
      await service.findAll(searchQuery, false);

      expect(tournamentRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            name: expect.anything(),
          }),
          order: expect.objectContaining({
            startDate: "DESC",
          }),
        }),
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
    it("should call repository", async () => {
      await service.findPast(searchQuery);

      expect(tournamentRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            name: expect.anything(),
            endDate: expect.anything(),
          }),
          order: expect.objectContaining({
            startDate: "DESC",
          }),
        }),
      );
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
          }),
          order: expect.objectContaining({
            startDate: "DESC",
          }),
        }),
      );
    });
  });

  describe("findUpcoming", () => {
    it("should call repository", async () => {
      await service.findUpcoming(searchQuery);

      expect(tournamentRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            name: expect.anything(),
            startDate: expect.anything(),
          }),
          order: expect.objectContaining({
            startDate: "ASC",
          }),
        }),
      );
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
});
