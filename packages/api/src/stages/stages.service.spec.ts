import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { stage } from "../../test/generators/stage";
import { FakeRepository } from "../../test/stubs/fakeRepository";
import { Stage } from "./stage.entity";
import { StagesService } from "./stages.service";

describe("Stages Service", () => {
  let service: StagesService;
  const tournamentIdWithStages = 1;
  const tournamentIdWithoutStages = 2;
  const stageRepository = new FakeRepository<Stage>([
    stage({ id: 1, tournamentId: tournamentIdWithStages }),
    stage({ id: 2, tournamentId: tournamentIdWithStages }),
  ]);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StagesService,
        {
          provide: getRepositoryToken(Stage),
          useValue: stageRepository,
        },
      ],
    }).compile();

    service = module.get<StagesService>(StagesService);
  });

  it("should be defined", async () => {
    expect(await service).toBeDefined();
  });

  it("should get all stages from a tournament", async () => {
    expect(
      await service.findAllByTournament(tournamentIdWithStages),
    ).toHaveLength(2);
  });

  it("should return empty array if tournament id has no stages registered", async () => {
    expect(
      await service.findAllByTournament(tournamentIdWithoutStages),
    ).toHaveLength(0);
  });
});
