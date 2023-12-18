import { SnakeSeedType } from "../lobbies/dto/snake-seed.args";
import { LobbiesService } from "../lobbies/lobbies.service";
import { LobbyPlayerInfosService } from "../lobby-player-infos/lobby-player-infos.service";
import { RoundResultsService } from "../round-results/round-results.service";
import { StagePlayerInfosService } from "../stage-player-infos/stage-player-infos.service";
import { StagesService } from "../stages/stages.service";
import { StageType } from "../stages/types/StageType";
import { SeedingService } from "./seeding.service";

describe("Seeding service", () => {
  let service: SeedingService;
  let lobbyService: LobbiesService;
  let stagePlayerInfosService: StagePlayerInfosService;
  let lobbyPlayerInfosService: LobbyPlayerInfosService;
  let roundResultsService: RoundResultsService;
  let stageService: StagesService;

  const mockLobbyGroupId = 123;
  const mockStageId = 456;
  const mockPreviousStageId = 789;

  beforeEach(() => {
    lobbyService = {
      findAllByLobbyGroup: jest.fn().mockResolvedValue([]),
    } as unknown as LobbiesService;
    stagePlayerInfosService = {
      findAllByStage: jest.fn().mockResolvedValue([]),
    } as unknown as StagePlayerInfosService;
    lobbyPlayerInfosService = {
      createManyLobbyPlayers: jest.fn().mockResolvedValue([]),
    } as unknown as LobbyPlayerInfosService;
    roundResultsService = {
      overviewResultsByStage: jest.fn().mockResolvedValue([]),
    } as unknown as RoundResultsService;
    stageService = {
      findOne: jest.fn().mockResolvedValue({
        id: mockStageId,
        stageType: StageType.RANKING,
      }),
      findPreviousStage: jest.fn().mockResolvedValue({
        id: mockPreviousStageId,
        stageType: StageType.RANKING,
      }),
    } as unknown as StagesService;

    service = new SeedingService(
      lobbyService,
      stagePlayerInfosService,
      lobbyPlayerInfosService,
      roundResultsService,
      stageService,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("snakeSeed", () => {
    it("if seed type = SEEDING, should get players from stage player info", async () => {
      await service.snakeSeed(
        mockLobbyGroupId,
        mockStageId,
        SnakeSeedType.SEEDING,
      );
      expect(stagePlayerInfosService.findAllByStage).toHaveBeenCalledWith(
        mockStageId,
      );
    });

    it("if seed type = CURRENT_STAGE, should get players from results service", async () => {
      await service.snakeSeed(
        mockLobbyGroupId,
        mockStageId,
        SnakeSeedType.CURRENT_STAGE,
      );
      expect(roundResultsService.overviewResultsByStage).toHaveBeenCalledWith(
        mockStageId,
      );
    });

    it("if seed type = LAST_STAGE, should get players from previous stage results", async () => {
      await service.snakeSeed(
        mockLobbyGroupId,
        mockStageId,
        SnakeSeedType.LAST_STAGE,
      );
      expect(roundResultsService.overviewResultsByStage).toHaveBeenCalledWith(
        mockPreviousStageId,
      );
    });
  });
});
