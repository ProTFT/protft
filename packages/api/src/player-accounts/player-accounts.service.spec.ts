import { Test, TestingModule } from "@nestjs/testing";
import { PlayerAccountsService } from "./player-accounts.service";

describe("PlayerAccountsService", () => {
  let service: PlayerAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerAccountsService],
    }).compile();

    service = module.get<PlayerAccountsService>(PlayerAccountsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
