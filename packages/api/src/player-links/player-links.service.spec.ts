import { Test, TestingModule } from "@nestjs/testing";
import { PlayerLinksService } from "./player-links.service";

describe("PlayerLinksService", () => {
  let service: PlayerLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerLinksService],
    }).compile();

    service = module.get<PlayerLinksService>(PlayerLinksService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
