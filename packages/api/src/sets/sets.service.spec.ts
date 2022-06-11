import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { set } from "../../test/generators/set";
import { FakeRepository } from "../../test/stubs/fakeRepository";
import { Set } from "./set.entity";
import { SetsService } from "./sets.service";

describe("SetsService", () => {
  let service: SetsService;
  const setRepository = new FakeRepository<Set>([
    set({ id: 1 }),
    set({ id: 2 }),
  ]);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetsService,
        {
          provide: getRepositoryToken(Set),
          useValue: setRepository,
        },
      ],
    }).compile();

    service = module.get<SetsService>(SetsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all sets", async () => {
    expect(await service.findAll()).toHaveLength(2);
  });

  it("should find one set", async () => {
    expect(await service.findOne(2)).toBeTruthy();
  });

  it("should not find an unregistered id", async () => {
    expect(await service.findOne(3)).toBeUndefined();
  });
});
