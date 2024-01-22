import { Repository } from "typeorm";
import { RoundResultsService } from "../round-results/round-results.service";
import { StagesService } from "../stages/stages.service";
import { StageType } from "../stages/types/StageType";
import { TournamentResult } from "./tournament-result.entity";
import { TournamentResultsService } from "./tournament-results.service";

const playerWithOnlyPosition = (id: number, position: number) => ({
  player: {
    id,
  },
  positions: new Array(5).fill(position),
  points: new Array(5).fill(9 - position),
});

jest.mock("../stages/stages.service", () => {
  const originalModule = jest.requireActual("../stages/stages.service");
  return {
    __esModule: true,
    ...originalModule,
    PLAYERS_IN_TFT_LOBBY: 4,
  };
});

describe("TournamentResultsService", () => {
  let service: TournamentResultsService;
  const tournamentResultRepository = {
    save: jest.fn(),
    find: jest.fn(),
    softDelete: jest.fn(),
    update: jest.fn(),
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

  describe("deleteResults", () => {
    it("should call delete on repo with parameters", async () => {
      const tournamentId = 1;
      await service.deleteResults(tournamentId);
      expect(tournamentResultRepository.softDelete).toHaveBeenCalledWith({
        tournamentId,
      });
    });
  });

  describe("lockResults", () => {
    describe("ranking-based tournament", () => {
      beforeEach(() => {
        stagesService.findAllByTournament = jest.fn().mockResolvedValue([
          {
            id: 1,
            stageType: StageType.RANKING,
            sequence: 1,
            sequenceForResult: 1,
          },
          {
            id: 2,
            stageType: StageType.RANKING,
            sequence: 2,
            sequenceForResult: 2,
          },
        ]);

        roundResultsService.overviewResultsByStage = jest
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
          {
            finalPosition: "1st",
            playerId: 1,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "2nd",
            playerId: 2,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "3rd",
            playerId: 4,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "4th",
            playerId: 3,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
        ]);
      });
    });

    describe("group-based tournament", () => {
      beforeEach(() => {
        stagesService.findAllByTournament = jest.fn().mockResolvedValue([
          {
            id: 1,
            stageType: StageType.GROUP_BASED,
            qualifiedCount: 4,
            sequence: 1,
            sequenceForResult: 1,
          },
          {
            id: 2,
            stageType: StageType.GROUP_BASED,
            qualifiedCount: 2,
            sequence: 2,
            sequenceForResult: 2,
          },
        ]);
      });

      it("should save results based on calculation", async () => {
        roundResultsService.lobbyResultsByStage = jest
          .fn()
          .mockImplementation((stageId: number) => {
            if (stageId === 1) {
              return [
                {
                  id: 1,
                  lobbies: [
                    {
                      id: 1,
                      results: [
                        playerWithOnlyPosition(1, 1),
                        playerWithOnlyPosition(2, 2),
                        playerWithOnlyPosition(9, 3),
                        playerWithOnlyPosition(10, 4),
                      ],
                    },
                    {
                      id: 2,
                      results: [
                        playerWithOnlyPosition(3, 5),
                        playerWithOnlyPosition(4, 6),
                        playerWithOnlyPosition(11, 7),
                        playerWithOnlyPosition(12, 8),
                      ],
                    },
                    {
                      id: 3,
                      results: [
                        playerWithOnlyPosition(5, 1),
                        playerWithOnlyPosition(6, 2),
                        playerWithOnlyPosition(13, 3),
                        playerWithOnlyPosition(14, 4),
                      ],
                    },
                    {
                      id: 4,
                      results: [
                        playerWithOnlyPosition(7, 5),
                        playerWithOnlyPosition(8, 6),
                        playerWithOnlyPosition(15, 7),
                        playerWithOnlyPosition(16, 8),
                      ],
                    },
                  ],
                },
              ];
            }

            return [
              {
                id: 1,
                lobbies: [
                  {
                    id: 1,
                    results: [
                      playerWithOnlyPosition(1, 1),
                      playerWithOnlyPosition(2, 2),
                      playerWithOnlyPosition(8, 7),
                      playerWithOnlyPosition(7, 8),
                    ],
                  },
                  {
                    id: 2,
                    results: [
                      playerWithOnlyPosition(3, 1),
                      playerWithOnlyPosition(4, 2),
                      playerWithOnlyPosition(6, 7),
                      playerWithOnlyPosition(5, 8),
                    ],
                  },
                ],
              },
            ];
          });
        await service.lockResults(mockTournamentId);
        expect(tournamentResultRepository.save).toHaveBeenCalledWith([
          {
            finalPosition: "1st-2nd",
            playerId: 1,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "1st-2nd",
            playerId: 3,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "3rd-4th",
            playerId: 2,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "3rd-4th",
            playerId: 4,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-6th",
            playerId: 8,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-6th",
            playerId: 6,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "7th-8th",
            playerId: 7,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "7th-8th",
            playerId: 5,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },

          {
            finalPosition: "9th-12th",
            playerId: 9,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 11,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 13,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 15,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 10,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 12,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 14,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 16,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
        ]);
      });

      it("when new players join on future stage, should be able to calculate", async () => {
        roundResultsService.lobbyResultsByStage = jest
          .fn()
          .mockImplementation((stageId: number) => {
            if (stageId === 1) {
              return [
                {
                  id: 1,
                  lobbies: [
                    {
                      id: 1,
                      results: [
                        playerWithOnlyPosition(1, 1),
                        playerWithOnlyPosition(2, 2),
                        playerWithOnlyPosition(9, 3),
                        playerWithOnlyPosition(10, 4),
                      ],
                    },
                    {
                      id: 2,
                      results: [
                        playerWithOnlyPosition(3, 5),
                        playerWithOnlyPosition(4, 6),
                        playerWithOnlyPosition(11, 7),
                        playerWithOnlyPosition(12, 8),
                      ],
                    },
                    {
                      id: 3,
                      results: [
                        playerWithOnlyPosition(5, 1),
                        playerWithOnlyPosition(6, 2),
                        playerWithOnlyPosition(13, 3),
                        playerWithOnlyPosition(14, 4),
                      ],
                    },
                    {
                      id: 4,
                      results: [
                        playerWithOnlyPosition(7, 5),
                        playerWithOnlyPosition(8, 6),
                        playerWithOnlyPosition(15, 7),
                        playerWithOnlyPosition(16, 8),
                      ],
                    },
                  ],
                },
              ];
            }

            return [
              {
                id: 1,
                lobbies: [
                  {
                    id: 1,
                    results: [
                      playerWithOnlyPosition(1, 1),
                      playerWithOnlyPosition(2, 2),
                      playerWithOnlyPosition(8, 7), // 8
                      playerWithOnlyPosition(7, 8), // 7
                    ],
                  },
                  {
                    id: 2,
                    results: [
                      playerWithOnlyPosition(3, 1),
                      playerWithOnlyPosition(4, 2),
                      playerWithOnlyPosition(6, 7),
                      playerWithOnlyPosition(5, 8),
                    ],
                  },
                  {
                    id: 3,
                    results: [
                      playerWithOnlyPosition(17, 1),
                      playerWithOnlyPosition(18, 2),
                      playerWithOnlyPosition(19, 7),
                      playerWithOnlyPosition(20, 8),
                    ],
                  },
                  {
                    id: 4,
                    results: [
                      playerWithOnlyPosition(21, 1),
                      playerWithOnlyPosition(22, 2),
                      playerWithOnlyPosition(23, 7),
                      playerWithOnlyPosition(24, 8),
                    ],
                  },
                ],
              },
            ];
          });
        await service.lockResults(mockTournamentId);
        expect(tournamentResultRepository.save).toHaveBeenCalledWith([
          {
            finalPosition: "1st-4th",
            playerId: 1,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "1st-4th",
            playerId: 3,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "1st-4th",
            playerId: 17,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "1st-4th",
            playerId: 21,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-8th",
            playerId: 2,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-8th",
            playerId: 4,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-8th",
            playerId: 18,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-8th",
            playerId: 22,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 8,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 6,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 19,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 23,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 7,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 5,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 20,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 24,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "17th-20th",
            playerId: 9,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "17th-20th",
            playerId: 11,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "17th-20th",
            playerId: 13,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "17th-20th",
            playerId: 15,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "21st-24th",
            playerId: 10,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "21st-24th",
            playerId: 12,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "21st-24th",
            playerId: 14,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "21st-24th",
            playerId: 16,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
        ]);
      });
    });

    describe("mixed tournament", () => {
      beforeEach(() => {
        stagesService.findAllByTournament = jest.fn().mockResolvedValue([
          {
            id: 1,
            stageType: StageType.GROUP_BASED,
            sequence: 1,
            sequenceForResult: 1,
          },
          {
            id: 2,
            stageType: StageType.RANKING,
            sequence: 2,
            sequenceForResult: 2,
          },
        ]);
        roundResultsService.overviewResultsByStage = jest
          .fn()
          .mockImplementation(() => {
            return [
              playerWithOnlyPosition(1, 1),
              playerWithOnlyPosition(2, 2),
              playerWithOnlyPosition(3, 3),
              playerWithOnlyPosition(4, 4),
              playerWithOnlyPosition(5, 5),
              playerWithOnlyPosition(6, 6),
              playerWithOnlyPosition(7, 7),
              playerWithOnlyPosition(8, 8),
            ];
          });
        roundResultsService.lobbyResultsByStage = jest
          .fn()
          .mockImplementation(() => {
            return [
              {
                id: 1,
                lobbies: [
                  {
                    id: 1,
                    results: [
                      playerWithOnlyPosition(1, 1),
                      playerWithOnlyPosition(2, 2),
                      playerWithOnlyPosition(9, 3),
                      playerWithOnlyPosition(10, 4),
                    ],
                  },
                  {
                    id: 2,
                    results: [
                      playerWithOnlyPosition(3, 5),
                      playerWithOnlyPosition(4, 6),
                      playerWithOnlyPosition(11, 7),
                      playerWithOnlyPosition(12, 8),
                    ],
                  },
                  {
                    id: 3,
                    results: [
                      playerWithOnlyPosition(5, 1),
                      playerWithOnlyPosition(6, 2),
                      playerWithOnlyPosition(13, 3),
                      playerWithOnlyPosition(14, 4),
                    ],
                  },
                  {
                    id: 4,
                    results: [
                      playerWithOnlyPosition(7, 5),
                      playerWithOnlyPosition(8, 6),
                      playerWithOnlyPosition(15, 7),
                      playerWithOnlyPosition(16, 8),
                    ],
                  },
                ],
              },
            ];
          });
      });

      it("should save results based on calculation", async () => {
        await service.lockResults(mockTournamentId);
        expect(tournamentResultRepository.save).toHaveBeenCalledWith([
          {
            finalPosition: "1st",
            playerId: 1,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "2nd",
            playerId: 2,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "3rd",
            playerId: 3,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "4th",
            playerId: 4,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th",
            playerId: 5,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "6th",
            playerId: 6,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "7th",
            playerId: 7,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "8th",
            playerId: 8,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 9,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 11,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 13,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 15,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 10,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 12,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 14,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 16,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
        ]);
      });
    });

    describe("tournament with play-ins", () => {
      beforeEach(() => {
        stagesService.findAllByTournament = jest.fn().mockResolvedValue([
          {
            id: 1,
            stageType: StageType.RANKING,
            sequence: 1,
            sequenceForResult: 1,
          },
          {
            id: 2,
            stageType: StageType.GROUP_BASED,
            sequence: 2,
            sequenceForResult: 2,
          },
          {
            id: 3,
            stageType: StageType.RANKING,
            sequence: 3,
            sequenceForResult: 3,
          },
        ]);
        roundResultsService.overviewResultsByStage = jest
          .fn()
          .mockImplementation((stageId: number) => {
            if (stageId === 3) {
              return [
                playerWithOnlyPosition(1, 1),
                playerWithOnlyPosition(2, 2),
                playerWithOnlyPosition(3, 3),
                playerWithOnlyPosition(4, 4),
                playerWithOnlyPosition(5, 5),
                playerWithOnlyPosition(6, 6),
                playerWithOnlyPosition(7, 7),
                playerWithOnlyPosition(8, 8),
              ];
            }

            return [
              playerWithOnlyPosition(1, 1),
              playerWithOnlyPosition(2, 2),
              playerWithOnlyPosition(3, 3),
              playerWithOnlyPosition(4, 4),
              playerWithOnlyPosition(17, 5),
              playerWithOnlyPosition(18, 6),
              playerWithOnlyPosition(19, 7),
              playerWithOnlyPosition(20, 8),
            ];
          });
        roundResultsService.lobbyResultsByStage = jest
          .fn()
          .mockImplementation(() => {
            return [
              {
                id: 1,
                lobbies: [
                  {
                    id: 1,
                    results: [
                      playerWithOnlyPosition(1, 1),
                      playerWithOnlyPosition(2, 2),
                      playerWithOnlyPosition(9, 3),
                      playerWithOnlyPosition(10, 4),
                    ],
                  },
                  {
                    id: 2,
                    results: [
                      playerWithOnlyPosition(3, 5),
                      playerWithOnlyPosition(4, 6),
                      playerWithOnlyPosition(11, 7),
                      playerWithOnlyPosition(12, 8),
                    ],
                  },
                  {
                    id: 3,
                    results: [
                      playerWithOnlyPosition(5, 1),
                      playerWithOnlyPosition(6, 2),
                      playerWithOnlyPosition(13, 3),
                      playerWithOnlyPosition(14, 4),
                    ],
                  },
                  {
                    id: 4,
                    results: [
                      playerWithOnlyPosition(7, 5),
                      playerWithOnlyPosition(8, 6),
                      playerWithOnlyPosition(15, 7),
                      playerWithOnlyPosition(16, 8),
                    ],
                  },
                ],
              },
            ];
          });
      });

      it("should save results based on calculation", async () => {
        await service.lockResults(mockTournamentId);
        expect(tournamentResultRepository.save).toHaveBeenCalledWith([
          {
            finalPosition: "1st",
            playerId: 1,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "2nd",
            playerId: 2,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "3rd",
            playerId: 3,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "4th",
            playerId: 4,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th",
            playerId: 5,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "6th",
            playerId: 6,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "7th",
            playerId: 7,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "8th",
            playerId: 8,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 9,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 11,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 13,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 15,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 10,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 12,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 14,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 16,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "17th",
            playerId: 17,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "18th",
            playerId: 18,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "19th",
            playerId: 19,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "20th",
            playerId: 20,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
        ]);
      });
    });

    describe("tournament with parallel group stages", () => {
      beforeEach(() => {
        stagesService.findAllByTournament = jest.fn().mockResolvedValue([
          {
            id: 1,
            sequence: 1,
            stageType: StageType.GROUP_BASED,
            sequenceForResult: 1,
          },
          {
            id: 2,
            sequence: 2,
            stageType: StageType.GROUP_BASED,
            sequenceForResult: 1,
          },
        ]);
        roundResultsService.lobbyResultsByStage = jest
          .fn()
          .mockImplementation((stageId: number) => {
            if (stageId === 1) {
              return [
                {
                  id: 1,
                  lobbies: [
                    {
                      id: 1,
                      results: [
                        playerWithOnlyPosition(1, 1),
                        playerWithOnlyPosition(2, 2),
                        playerWithOnlyPosition(9, 3),
                        playerWithOnlyPosition(10, 4),
                      ],
                    },
                    {
                      id: 2,
                      results: [
                        playerWithOnlyPosition(3, 5),
                        playerWithOnlyPosition(4, 6),
                        playerWithOnlyPosition(11, 7),
                        playerWithOnlyPosition(12, 8),
                      ],
                    },
                  ],
                },
              ];
            }
            return [
              {
                id: 1,
                lobbies: [
                  {
                    id: 3,
                    results: [
                      playerWithOnlyPosition(5, 1),
                      playerWithOnlyPosition(6, 2),
                      playerWithOnlyPosition(13, 3),
                      playerWithOnlyPosition(14, 4),
                    ],
                  },
                  {
                    id: 4,
                    results: [
                      playerWithOnlyPosition(7, 5),
                      playerWithOnlyPosition(8, 6),
                      playerWithOnlyPosition(15, 7),
                      playerWithOnlyPosition(16, 8),
                    ],
                  },
                ],
              },
            ];
          });
      });

      it("should be able to consider stages as side-by-side", async () => {
        await service.lockResults(mockTournamentId);
        expect(tournamentResultRepository.save).toHaveBeenCalledWith([
          {
            finalPosition: "1st-4th",
            playerId: 5,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "1st-4th",
            playerId: 7,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "1st-4th",
            playerId: 1,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "1st-4th",
            playerId: 3,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-8th",
            playerId: 6,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-8th",
            playerId: 8,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-8th",
            playerId: 2,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-8th",
            playerId: 4,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 13,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 15,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 9,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "9th-12th",
            playerId: 11,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 14,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 16,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 10,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "13th-16th",
            playerId: 12,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
        ]);
      });
    });

    describe("tournament with parallel ranking stages", () => {
      beforeEach(() => {
        stagesService.findAllByTournament = jest.fn().mockResolvedValue([
          {
            id: 1,
            sequence: 1,
            stageType: StageType.RANKING,
            sequenceForResult: 1,
          },
          {
            id: 2,
            sequence: 2,
            stageType: StageType.RANKING,
            sequenceForResult: 1,
          },
        ]);
        roundResultsService.overviewResultsByStage = jest
          .fn()
          .mockImplementation((stageId: number) => {
            if (stageId === 1) {
              return [
                playerWithOnlyPosition(1, 1),
                playerWithOnlyPosition(2, 2),
                playerWithOnlyPosition(3, 3),
                playerWithOnlyPosition(4, 4),
              ];
            }

            return [
              playerWithOnlyPosition(9, 1),
              playerWithOnlyPosition(10, 2),
              playerWithOnlyPosition(11, 3),
              playerWithOnlyPosition(12, 4),
            ];
          });
      });

      it("should be able to consider stages as side-by-side", async () => {
        await service.lockResults(mockTournamentId);
        expect(tournamentResultRepository.save).toHaveBeenCalledWith([
          {
            finalPosition: "1st-2nd",
            playerId: 9,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "1st-2nd",
            playerId: 1,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "3rd-4th",
            playerId: 10,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "3rd-4th",
            playerId: 2,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-6th",
            playerId: 11,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "5th-6th",
            playerId: 3,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "7th-8th",
            playerId: 12,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
          {
            finalPosition: "7th-8th",
            playerId: 4,
            tournamentId: mockTournamentId,
            deletedAt: null,
          },
        ]);
      });
    });
  });

  describe("updatePlayer", () => {
    it("should call repository", async () => {
      await service.updatePlayer(10, 11);
      expect(tournamentResultRepository.update).toHaveBeenCalledWith(
        { playerId: 10 },
        { playerId: 11 },
      );
    });
  });
});
