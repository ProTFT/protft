import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { FakeRepository } from "../../test/stubs/fakeRepository";
import { RoundResult } from "./round-result.entity";
import { RoundResultsService } from "./round-results.service";

describe("RoundResultsService", () => {
  let service: RoundResultsService;

  const roundResultsRepository = new FakeRepository<RoundResult>([]);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoundResultsService,
        {
          provide: getRepositoryToken(RoundResult),
          useValue: roundResultsRepository,
        },
      ],
    }).compile();

    service = module.get<RoundResultsService>(RoundResultsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
