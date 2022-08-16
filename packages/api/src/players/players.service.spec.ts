import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { player } from "../../test/generators/player";
import { FakeIndexedRepository } from "../../test/stubs/fakeRepository";
import { CreatePlayerArgs } from "./dto/create-player.args";
import { Player } from "./player.entity";
import { PlayersService } from "./players.service";

class PlayerFakeRepository extends FakeIndexedRepository<Player> {
  createQueryBuilder() {
    return this;
  }
  select() {
    return this;
  }
  distinct() {
    return this;
  }
  orderBy() {
    return this;
  }
  execute() {
    return [
      { country: "Brazil", region: "BR" },
      { country: "Canada", region: "NA" },
      { country: "Germany", region: "EU" },
    ];
  }
}

describe("PlayersService", () => {
  let service: PlayersService;
  const playerRepository = new PlayerFakeRepository([
    player({ id: 1, region: "BR", country: "Brazil" }),
    player({ id: 2, region: "NA", country: "Canada" }),
    player({ id: 3, region: "BR", country: "Brazil" }),
    player({ id: 4, region: "EU", country: "Germany" }),
  ]);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useValue: playerRepository,
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("find all", () => {
    it("should return all players", async () => {
      expect(await service.findAll({})).toHaveLength(4);
    });
  });

  describe("find one", () => {
    it("should find one player", async () => {
      expect(await service.findOne(2)).toBeTruthy();
    });

    it("should not find an unregistered id", async () => {
      expect(await service.findOne(10)).toBeUndefined();
    });
  });

  describe("find unique countries", () => {
    it("should extract distinct countries", async () => {
      expect(await service.findUniqueCountries()).toStrictEqual([
        "Brazil",
        "Canada",
        "Germany",
      ]);
    });
  });

  describe("find unique regions", () => {
    it("should extract distinct regions", async () => {
      expect(await service.findUniqueRegions()).toStrictEqual([
        "BR",
        "NA",
        "EU",
      ]);
    });
  });

  describe("create one", () => {
    it("should be able to create one", async () => {
      const payload: CreatePlayerArgs = {
        name: "anyName",
        country: "anyCountry",
        region: "anyRegion",
      };
      const playerCount = (await service.findAll({})).length;
      await service.createOne(payload);
      expect(await service.findAll({})).toHaveLength(playerCount + 1);
    });
  });
});
