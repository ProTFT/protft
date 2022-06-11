import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { tournament } from "../../test/generators/tournament";
import { FakeRepository } from "../../test/stubs/fakeRepository";
import { Tournament } from "./tournament.entity";
import { TournamentsService } from "./tournaments.service";

describe("TournamentsService", () => {
  let service: TournamentsService;
  const tournamentRepository = new FakeRepository<Tournament>([
    tournament({ id: 1 }),
    tournament({ id: 2 }),
  ]);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TournamentsService,
        {
          provide: getRepositoryToken(Tournament),
          useValue: tournamentRepository,
        },
      ],
    }).compile();

    service = module.get<TournamentsService>(TournamentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all tournaments", async () => {
    expect(await service.findAll()).toHaveLength(2);
  });

  it("should find one tournament", async () => {
    expect(await service.findOne(2)).toBeTruthy();
  });

  it("should not find an unregistered id", async () => {
    expect(await service.findOne(3)).toBeUndefined();
  });
});
