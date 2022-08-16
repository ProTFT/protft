import { Test, TestingModule } from "@nestjs/testing";
import { StagePlayerInfosService } from "./stage-player-infos.service";

describe("StagePlayerInfosService", () => {
  let service: StagePlayerInfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StagePlayerInfosService],
    }).compile();

    service = module.get<StagePlayerInfosService>(StagePlayerInfosService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
