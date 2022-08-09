import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { round } from "../../test/generators/round";
import { FakeIndexedRepository } from "../../test/stubs/fakeRepository";
import { CreateRoundArgs } from "./dto/create-round.args";
import { Round } from "./round.entity";
import { RoundsService } from "./rounds.service";

describe("RoundsService", () => {
  let service: RoundsService;
  const stageIdWithTwoRounds = 5;
  const stageIdWithNoRounds = 1;

  const roundsRepository = new FakeIndexedRepository<Round>([
    round({ stageId: stageIdWithTwoRounds }),
    round({ stageId: stageIdWithTwoRounds }),
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

  describe("find by stage", () => {
    it("should get rounds of stage", async () => {
      expect(await service.findByStage(stageIdWithTwoRounds)).toHaveLength(2);
    });

    it("should be empty if no rounds on db", async () => {
      expect(await service.findByStage(stageIdWithNoRounds)).toHaveLength(0);
    });
  });

  describe("count by stage", () => {
    it("should get round count", async () => {
      expect(await service.countByStage(stageIdWithTwoRounds)).toBe(2);
    });

    it("should get count if there are no rounds", async () => {
      expect(await service.countByStage(stageIdWithNoRounds)).toBe(0);
    });
  });

  describe("create one", () => {
    it("should create one", async () => {
      const stageId = 100;
      const payload: CreateRoundArgs = { sequence: 0, stageId };
      expect(await service.findByStage(stageId)).toHaveLength(0);
      await service.createOne(payload);
      expect(await service.findByStage(stageId)).toHaveLength(1);
    });
  });
});
