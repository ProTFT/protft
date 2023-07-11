import { Repository } from "typeorm";
import { Tournament } from "./entities/tournament.entity";
import {
  TournamentRepository,
  TOURNAMENT_INITIAL_PAGE,
  TOURNAMENT_PAGE_SIZE,
} from "./tournament.repository";

const defaultPaginationArgs = {
  skip: TOURNAMENT_INITIAL_PAGE,
  take: TOURNAMENT_PAGE_SIZE,
};

describe("Tournament repository", () => {
  let tournamentRepository: TournamentRepository;
  let innerRepo: Repository<Tournament>;

  beforeEach(() => {
    innerRepo = {
      find: jest.fn(),
    } as unknown as Repository<Tournament>;
    tournamentRepository = new TournamentRepository(innerRepo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("find with pagination", () => {
    it("with no parameters, should fetch all visible paginated", async () => {
      await tournamentRepository.findWithPagination();

      expect(innerRepo.find).toHaveBeenCalledWith({
        ...defaultPaginationArgs,
        where: expect.objectContaining({ visibility: true }),
      });
    });

    describe("filters", () => {
      it("with searchQuery, should filter by name", async () => {
        const searchQuery = "test";
        await tournamentRepository.findWithPagination({ searchQuery });

        expect(innerRepo.find).toHaveBeenCalledWith({
          ...defaultPaginationArgs,
          where: expect.objectContaining({
            visibility: true,
            name: expect.anything(),
          }),
        });
      });

      it("with region, should filter by region", async () => {
        const region = ["WO", "NA"];
        await tournamentRepository.findWithPagination({ region });

        expect(innerRepo.find).toHaveBeenCalledWith({
          ...defaultPaginationArgs,
          where: expect.objectContaining({
            visibility: true,
            region: expect.anything(),
          }),
        });
      });

      it("with setId, should filter by set", async () => {
        const setId = [1, 2];
        await tournamentRepository.findWithPagination({ setId });

        expect(innerRepo.find).toHaveBeenCalledWith({
          ...defaultPaginationArgs,
          where: expect.objectContaining({
            visibility: true,
            setId: expect.anything(),
          }),
        });
      });

      it("with single custom filter, should apply", async () => {
        const participantsNumber = 10;
        await tournamentRepository.findWithPagination(
          {},
          {},
          { condition: { participantsNumber } },
        );

        expect(innerRepo.find).toHaveBeenCalledWith({
          ...defaultPaginationArgs,
          where: expect.objectContaining({
            visibility: true,
            participantsNumber: expect.anything(),
          }),
        });
      });

      it("with multiple custom filter, should apply", async () => {
        const participantsNumber = 10;
        const currency = "EUR";
        await tournamentRepository.findWithPagination(
          {},
          {},
          { condition: { participantsNumber, currency } },
        );

        expect(innerRepo.find).toHaveBeenCalledWith({
          ...defaultPaginationArgs,
          where: expect.objectContaining({
            visibility: true,
            participantsNumber: expect.anything(),
            currency: expect.anything(),
          }),
        });
      });

      it("should be able to fetch invisible tournaments", async () => {
        await tournamentRepository.findWithPagination(
          {},
          {},
          { onlyVisible: false },
        );

        expect(innerRepo.find).toHaveBeenCalledWith({
          ...defaultPaginationArgs,
          where: {},
        });
      });
    });

    describe("sorting", () => {
      it("should apply sorting", async () => {
        const sorting = { name: "ASC" } as any;
        await tournamentRepository.findWithPagination({}, {}, { sorting });

        expect(innerRepo.find).toHaveBeenCalledWith({
          ...defaultPaginationArgs,
          where: {
            visibility: true,
          },
          order: expect.objectContaining(sorting),
        });
      });
    });

    describe("pagination", () => {
      it("should apply custom pagination params", async () => {
        const take = 123;
        const skip = 456;
        await tournamentRepository.findWithPagination({}, { take, skip });

        expect(innerRepo.find).toHaveBeenCalledWith({
          take,
          skip,
          where: expect.objectContaining({
            visibility: true,
          }),
        });
      });
    });
  });
});
