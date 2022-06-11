import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { lobby } from "../../test/generators/lobby";
import { round } from "../../test/generators/round";
import { FakeRepository } from "../../test/stubs/fakeRepository";
import { LobbiesService } from "./lobbies.service";
import { Lobby } from "./lobby.entity";
import { RoundResult } from "./round-result.entity";
import { Round } from "./round.entity";

const expectedRoundResult = { any: "Object" };

class RoundResultFakeRepository {
  createQueryBuilder() {
    return this;
  }
  select() {
    return this;
  }
  innerJoin() {
    return this;
  }
  where() {
    return this;
  }
  orderBy() {
    return this;
  }
  execute() {
    return expectedRoundResult;
  }
}

describe("LobbiesService", () => {
  let service: LobbiesService;
  const stageIdWithLobbies = 1;
  const stageIdWithoutLobbies = 4;
  const lobbyIdWithRounds = 3;
  const lobbyRepository = new FakeRepository<Lobby>([
    lobby({ id: 1, stageId: stageIdWithLobbies }),
    lobby({ id: 2, stageId: stageIdWithLobbies }),
    lobby({ id: 3 }),
    lobby({ id: 4 }),
  ]);

  const roundsRepository = new FakeRepository<Round>([
    round({ lobbyId: lobbyIdWithRounds }),
    round({ lobbyId: lobbyIdWithRounds }),
    round({ lobbyId: lobbyIdWithRounds }),
    round({ lobbyId: 5 }),
    round({ lobbyId: 6 }),
  ]);
  const roundResultsRepository = new RoundResultFakeRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LobbiesService,
        {
          provide: getRepositoryToken(Lobby),
          useValue: lobbyRepository,
        },
        {
          provide: getRepositoryToken(Round),
          useValue: roundsRepository,
        },
        {
          provide: getRepositoryToken(RoundResult),
          useValue: roundResultsRepository,
        },
      ],
    }).compile();

    service = module.get<LobbiesService>(LobbiesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should find lobbies by stage", async () => {
    expect(await service.findAllByStage(stageIdWithLobbies)).toHaveLength(2);
  });

  it("should find no lobbies if stage does not have it", async () => {
    expect(await service.findAllByStage(stageIdWithoutLobbies)).toHaveLength(0);
  });

  it("should count rounds of a lobby", async () => {
    expect(await service.findRoundCount(lobbyIdWithRounds)).toBe(3);
  });

  it("should return round result query result", async () => {
    expect(await service.findLobbyResults(lobbyIdWithRounds)).toStrictEqual(
      expectedRoundResult,
    );
  });
});
