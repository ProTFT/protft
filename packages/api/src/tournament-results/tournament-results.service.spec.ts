import { Repository } from "typeorm";
import { RoundResultsService } from "../round-results/round-results.service";
import { StagesService } from "../stages/stages.service";
import { TournamentResult } from "./tournament-result.entity";
import { TournamentResultsService } from "./tournament-results.service";

const playerWithOnlyPosition = (id: number, position: number) => ({
  player: {
    id,
  },
  positions: new Array(5).fill(position),
  points: new Array(5).fill(9 - position),
});

describe("TournamentResultsService", () => {
  let service: TournamentResultsService;
  const tournamentResultRepository = {
    save: jest.fn(),
    find: jest.fn(),
  } as unknown as Repository<TournamentResult>;

  const stagesService = {
    findAllByTournament: jest.fn(),
  } as unknown as StagesService;

  const roundResultsService = {
    findStatsByPlayer: jest.fn(),
  } as unknown as RoundResultsService;

  const mockTournamentId = 1;

  beforeEach(async () => {
    service = new TournamentResultsService(
      tournamentResultRepository,
      stagesService,
      roundResultsService,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("findAllByTournament", () => {
    it("should call repository", async () => {
      const tournamentId = 1;
      await service.findAllByTournament(tournamentId);
      expect(tournamentResultRepository.find).toHaveBeenCalledWith({
        where: {
          tournamentId,
        },
      });
    });
  });

  describe("lockResults", () => {
    beforeAll(() => {
      stagesService.findAllByTournament = jest
        .fn()
        .mockResolvedValue([{ id: 1 }, { id: 2 }]);

      roundResultsService.resultsByStage = jest
        .fn()
        .mockImplementation((stageId: number) => {
          if (stageId === 1) {
            return [
              playerWithOnlyPosition(1, 1),
              playerWithOnlyPosition(2, 2),
              playerWithOnlyPosition(4, 3),
              playerWithOnlyPosition(3, 4),
            ];
          }

          return [playerWithOnlyPosition(1, 2), playerWithOnlyPosition(2, 7)];
        });
    });

    it("should save results based on calculation", async () => {
      await service.lockResults(mockTournamentId);
      expect(tournamentResultRepository.save).toHaveBeenCalledWith([
        { finalPosition: 1, playerId: 1, tournamentId: mockTournamentId },
        { finalPosition: 2, playerId: 2, tournamentId: mockTournamentId },
        { finalPosition: 3, playerId: 4, tournamentId: mockTournamentId },
        { finalPosition: 4, playerId: 3, tournamentId: mockTournamentId },
      ]);
    });
  });
});
