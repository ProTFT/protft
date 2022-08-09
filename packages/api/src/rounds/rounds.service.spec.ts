import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { round } from "../../test/generators/round";
import { FakeIndexedRepository } from "../../test/stubs/fakeRepository";
import { Round } from "./round.entity";
import { RoundsService } from "./rounds.service";

describe("RoundsService", () => {
  let service: RoundsService;

  const roundsRepository = new FakeIndexedRepository<Round>([
    round({ stageId: 5 }),
    round({ stageId: 6 }),
  ]);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoundsService,
        {
          provide: getRepositoryToken(Round),
          useValue: roundsRepository,
        },
      ],
    }).compile();

    service = module.get<RoundsService>(RoundsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
