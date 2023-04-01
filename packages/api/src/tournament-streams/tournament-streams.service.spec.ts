import { Repository } from "typeorm";
import { TournamentStream } from "./tournament-stream.entity";
import { TournamentStreamsService } from "./tournament-streams.service";

describe("TournamentStreamsService", () => {
  let service: TournamentStreamsService;
  const tournamentStreamRepository = {
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  } as unknown as Repository<TournamentStream>;

  const mockTournamentId = 1;
  const mockStream = {
    anyThing: 0,
  } as unknown as TournamentStream;

  beforeEach(async () => {
    service = new TournamentStreamsService(tournamentStreamRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("findStreamsByTournament", () => {
    it("should call repository", async () => {
      await service.findStreamsByTournament(mockTournamentId);
      expect(tournamentStreamRepository.find).toHaveBeenCalledWith({
        where: {
          tournamentId: mockTournamentId,
        },
      });
    });
  });

  describe("findVodsByTournament", () => {
    it("should call repository", async () => {
      await service.findVodsByTournament(mockTournamentId);
      expect(tournamentStreamRepository.find).toHaveBeenCalledWith({
        where: {
          isVOD: true,
          tournamentId: mockTournamentId,
        },
      });
    });
  });

  describe("addStream", () => {
    it("should call repository", async () => {
      await service.addStream(mockStream);
      expect(tournamentStreamRepository.save).toHaveBeenCalledWith(mockStream);
    });
  });

  describe("deleteStream", () => {
    it("should call repository", async () => {
      const mockName = "test";
      await service.deleteStream(mockTournamentId, mockName);
      expect(tournamentStreamRepository.delete).toHaveBeenCalledWith({
        tournamentId: mockTournamentId,
        name: mockName,
      });
    });
  });
});
