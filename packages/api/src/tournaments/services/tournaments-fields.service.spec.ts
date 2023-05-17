import { StagesService } from "../../stages/stages.service";
import { Settings } from "luxon";
import { TournamentsFieldsService } from "./tournaments-fields.service";
import { tournament } from "../../../test/generators/tournament";
import { stage } from "../../../test/generators/stage";
import { round } from "../../../test/generators/round";

describe("TournamentsFieldsService", () => {
  let service: TournamentsFieldsService;
  let stagesService: StagesService;

  beforeEach(() => {
    stagesService = {} as unknown as StagesService;
    service = new TournamentsFieldsService(stagesService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("findNextStageStartTime", () => {
    const hoursToMs = (hours: number) => minutesToMs(hours * 60);
    const minutesToMs = (minutes: number) => minutes * 60 * 1000;
    const mockTournament = tournament({ endDate: new Date(2023, 5, 2, 13) });

    it("if tournament is in the past, should return 0", async () => {
      const dateIn2022 = new Date(2022, 1, 1);
      const dateIn2023 = new Date(2023, 5, 31);
      const tournamentIn2022 = tournament({ endDate: dateIn2022 });
      Settings.now = () => dateIn2023.valueOf();

      const response = await service.findNextStageStartTime(tournamentIn2022);

      expect(response).toBe(0);
    });

    it("if we are 23 hours away from the stage start, should return 23 hours in ms", async () => {
      Settings.now = () => new Date(2023, 5, 1, 12, 0, 0).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        stage({
          startDateTime: new Date(2023, 5, 2, 11, 0, 0).toISOString(),
          rounds: [round({})],
        }),
      ]);

      const response = await service.findNextStageStartTime(mockTournament);

      expect(response).toBe(hoursToMs(23));
    });

    it("if we are 30 minutes away from the stage start, should return 30 minutes in ms", async () => {
      Settings.now = () => new Date(2023, 5, 1, 12).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        stage({
          startDateTime: new Date(2023, 5, 1, 12, 30).toISOString(),
          rounds: [round({})],
        }),
      ]);

      const response = await service.findNextStageStartTime(mockTournament);

      expect(response).toBe(minutesToMs(30));
    });

    it("if we are past 30 minutes from the stage start, should return negative", async () => {
      Settings.now = () => new Date(2023, 5, 1, 13).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        stage({
          startDateTime: new Date(2023, 5, 1, 12, 30).toISOString(),
          rounds: [round({})],
        }),
      ]);

      const response = await service.findNextStageStartTime(mockTournament);

      expect(response).toBeLessThan(0);
    });

    it("if we are past 1h30 from stage start, it has one round but no next stage, should return 0", async () => {
      Settings.now = () => new Date(2023, 5, 1, 14).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          startDateTime: new Date(2023, 5, 1, 12, 30).toISOString(),
          rounds: [{}],
        },
      ]);

      const response = await service.findNextStageStartTime(mockTournament);

      expect(response).toBe(0);
    });

    it("if we are 1h30 past the stage start, it has one round, and has next stage should return the next stage countdown", async () => {
      Settings.now = () => new Date(2023, 5, 1, 14).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          startDateTime: new Date(2023, 5, 1, 12, 30).toISOString(),
          rounds: [{}],
        },
        {
          startDateTime: new Date(2023, 5, 1, 16).toISOString(),
          rounds: [{}],
        },
      ]);

      const response = await service.findNextStageStartTime(mockTournament);

      expect(response).toBe(hoursToMs(2));
    });

    it("if we are 1h30 past stage start, but it has two rounds, should be negative (Because its still live)", async () => {
      Settings.now = () => new Date(2023, 5, 1, 14).valueOf();

      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          startDateTime: new Date(2023, 5, 1, 12, 30).toISOString(),
          rounds: [{}, {}],
        },
        {
          startDateTime: new Date(2023, 5, 1, 16).toISOString(),
          rounds: [{}],
        },
      ]);

      const response = await service.findNextStageStartTime(mockTournament);

      expect(response).toBeLessThan(0);
    });
  });
});
