import { Repository } from "typeorm";
import { Tournament } from "../entities/tournament.entity";
import { TournamentRepository } from "../tournament.repository";
import { TournamentsReadService } from "./tournaments-read.service";

jest.mock("../tournament.repository");

describe("TournamentsReadService", () => {
  let service: TournamentsReadService;
  let tournamentRepository: Repository<Tournament>;
  let findWithPaginationSpy: jest.SpyInstance;
  const mockTournamentId = 1;
  const searchQuery = "test";

  beforeEach(() => {
    findWithPaginationSpy = jest.spyOn(
      TournamentRepository.prototype,
      "findWithPagination",
    );
    tournamentRepository = {
      findOne: jest.fn(),
    } as unknown as Repository<Tournament>;
    service = new TournamentsReadService(tournamentRepository);
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
      findWithPaginationSpy.mockResolvedValue(tournaments);
      const response = await service.findWithStats({});

      expect(findWithPaginationSpy).toHaveBeenCalledTimes(2);
      expect(response).toStrictEqual([...tournaments, ...tournaments]);
    });

    it("should use searchquery on both searches", async () => {
      const searchQuery = "test";
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
      findWithPaginationSpy.mockResolvedValue(tournaments);
      const response = await service.findWithStats({ searchQuery });

      expect(findWithPaginationSpy).toHaveBeenCalledTimes(2);
      expect(findWithPaginationSpy).toHaveBeenNthCalledWith(
        1,
        { searchQuery },
        undefined,
        expect.anything(),
      );
      expect(findWithPaginationSpy).toHaveBeenNthCalledWith(
        2,
        { searchQuery },
        { skip: 0, take: 100 },
        expect.anything(),
      );
      expect(response).toStrictEqual([...tournaments, ...tournaments]);
    });
  });

  describe("findOngoing", () => {
    it("should call repository", async () => {
      const searchQuery = "test";
      await service.findOngoing({ searchQuery });

      expect(findWithPaginationSpy).toHaveBeenCalledWith(
        expect.objectContaining({ searchQuery }),
        expect.anything(),
        expect.objectContaining({
          condition: expect.objectContaining({
            startDate: expect.anything(),
            endDate: expect.anything(),
          }),
          sorting: expect.objectContaining({
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
});
