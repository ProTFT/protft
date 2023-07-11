import { tournament } from "../../../test/generators/tournament";
import { TournamentsExternalService } from "./tournaments-external.service";
import { SetsService } from "../../sets/sets.service";
import { Tournament } from "../entities/tournament.entity";
import { Repository } from "typeorm";
import { set } from "../../../test/generators/set";

describe("TournamentsExternalService", () => {
  let service: TournamentsExternalService;
  let setsService: SetsService;
  let tournamentRepository: Repository<Tournament>;

  beforeEach(() => {
    tournamentRepository = {
      save: jest.fn(),
    } as unknown as Repository<Tournament>;
    setsService = {
      findOne: jest.fn().mockResolvedValue(set({})),
    } as unknown as SetsService;
    service = new TournamentsExternalService(tournamentRepository, setsService);
  });

  afterEach(jest.clearAllMocks);

  describe("createOne", () => {
    it("should call save", async () => {
      await service.createOne(tournament());

      expect(tournamentRepository.save).toHaveBeenCalled();
    });

    it("should be invisible and have slug", async () => {
      await service.createOne(tournament());

      expect(tournamentRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          visibility: false,
          slug: expect.any(String),
        }),
      );
    });
  });
});
