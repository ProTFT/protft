import { BadRequestException } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { formatString } from "../../test/helpers/File";
import { RoundResultsService } from "../round-results/round-results.service";
import { Player } from "./player.entity";
import { PlayersService } from "./players.service";

describe("PlayersService", () => {
  let service: PlayersService;
  let mockQueryBuilderValue = null;
  const playerRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: () => ({
      select: jest.fn().mockReturnThis(),
      distinct: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue(mockQueryBuilderValue),
    }),
  } as unknown as Repository<Player>;

  const roundResultsService = {
    findStatsByPlayer: jest.fn(),
  } as unknown as RoundResultsService;

  beforeEach(async () => {
    service = new PlayersService(playerRepository, roundResultsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("find all", () => {
    it("should call repository", async () => {
      await service.findAll({}, {});
      expect(playerRepository.find).toHaveBeenCalled();
    });

    it("should pass all parameters", async () => {
      const searchQuery = "test";
      const region = "EMEA";
      const country = "GBR";
      const take = 10;
      const skip = 20;
      await service.findAll(
        {
          searchQuery,
          region,
          country,
        },
        {
          take,
          skip,
        },
        {
          id: "ASC",
        },
      );
      expect(playerRepository.find).toHaveBeenCalledWith({
        where: {
          name: ILike(`%${searchQuery}%`),
          country,
          region,
        },
        take,
        skip,
        order: { id: "ASC" },
      });
    });

    it("if no parameters, should pass default values", async () => {
      await service.findAll({}, {});
      expect(playerRepository.find).toHaveBeenCalledWith({
        where: {},
        take: 10,
        skip: 0,
        order: {},
      });
    });
  });

  describe("find one", () => {
    it("should call repository", async () => {
      const id = 2;
      await service.findOne(id);
      expect(playerRepository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe("find one by slug", () => {
    it("should call repository", async () => {
      const slug = "slug";
      await service.findOneBySlug(slug);
      expect(playerRepository.findOne).toHaveBeenCalledWith({
        slug: slug,
      });
    });
  });

  describe("create one", () => {
    it("should throw if name or region are not passed", async () => {
      expect(
        async () =>
          await service.createOne({ name: "", region: "", country: "" }),
      ).rejects.toThrow();
    });

    it("should save player and update its slug after", async () => {
      const id = 25;
      const name = "name";
      const region = "region";
      const country = "country";

      playerRepository.save = jest.fn().mockResolvedValueOnce({
        id,
        name,
        region,
        country,
      });

      await service.createOne({ name, region, country }),
        expect(playerRepository.save).toHaveBeenCalledWith({
          name,
          country,
          region,
        });
      expect(playerRepository.update).toHaveBeenCalledWith(
        {
          id,
        },
        { slug: "25-name" },
      );
    });
  });

  describe("create bulk", () => {
    const fileString = formatString(`
        Name,Country,Region
        Lucas,BRA,BR
        Pedro,GBR,EMEA
      `);
    const brazilianPlayer = {
      country: "BRA",
      name: "Lucas",
      region: "BR",
    };
    const englishPlayer = {
      country: "GBR",
      name: "Pedro",
      region: "EMEA",
    };

    it("when title is wrong, should throw", async () => {
      const emptyFile = "";
      expect(
        async () => await service.createBulk(emptyFile, true),
      ).rejects.toThrowError(BadRequestException);
    });

    it("when dry run, should return results but not save", async () => {
      const response = await service.createBulk(fileString);
      expect(response).toStrictEqual({
        newPlayers: [brazilianPlayer, englishPlayer],
        repeatedPlayers: [],
        dryRun: true,
      });
      expect(playerRepository.save).not.toHaveBeenCalled();
      expect(playerRepository.find).not.toHaveBeenCalled();
    });

    it("when one player already exists, should not create it", async () => {
      const dryRun = true;
      playerRepository.findOne = jest.fn().mockImplementation(({ where }) => {
        const { region } = where;
        return region === brazilianPlayer.region ? {} : undefined;
      });
      const response = await service.createBulk(fileString, dryRun);
      expect(response).toStrictEqual({
        newPlayers: [englishPlayer],
        repeatedPlayers: [brazilianPlayer],
        dryRun,
      });
    });

    it("when is not dry run, should save players and update their slugs", async () => {
      playerRepository.find = jest
        .fn()
        .mockResolvedValueOnce([brazilianPlayer, englishPlayer]);

      const dryRun = false;
      const response = await service.createBulk(fileString, dryRun);
      expect(response).toStrictEqual({
        newPlayers: [brazilianPlayer, englishPlayer],
        repeatedPlayers: [],
        dryRun,
      });
      expect(playerRepository.save).toHaveBeenCalledWith([
        brazilianPlayer,
        englishPlayer,
      ]);
      expect(playerRepository.update).toHaveBeenCalledTimes(2);
    });
  });

  describe("find unique countries", () => {
    it("should extract distinct countries", async () => {
      mockQueryBuilderValue = [
        {
          country: "BRA",
        },
        {
          country: "GBR",
        },
        {
          country: "USA",
        },
      ];
      const response = await service.findUniqueCountries();
      expect(response).toStrictEqual(["BRA", "GBR", "USA"]);
    });
  });

  describe("find unique countries", () => {
    it("should extract distinct regions", async () => {
      mockQueryBuilderValue = [
        {
          region: "EMEA",
        },
        {
          region: "NA",
        },
        {
          region: "SEA",
        },
      ];
      const response = await service.findUniqueRegions();
      expect(response).toStrictEqual(["EMEA", "NA", "SEA"]);
    });
  });

  describe("find tournaments played", () => {
    it("should call query builder", async () => {
      const tournamentData = { id: 1, name: "TournamentName" };
      mockQueryBuilderValue = [tournamentData];

      const response = await service.findTournamentsPlayed(1);

      expect(response).toStrictEqual([tournamentData]);
    });
  });

  describe("delete one", () => {
    it("should throw if player does not exist", async () => {
      playerRepository.findOne = jest.fn().mockResolvedValue(undefined);

      expect(async () => await service.deleteOne(1)).rejects.toThrow();
    });

    it("should call repository", async () => {
      const player = { id: 1 };
      playerRepository.findOne = jest.fn().mockResolvedValue(player);

      const response = await service.deleteOne(1);

      expect(playerRepository.delete).toHaveBeenCalled();
      expect(response).toStrictEqual(player);
    });
  });

  describe("get player stats", () => {
    it("should return stats", async () => {
      const statsRaw = {
        averagePosition: 1,
      };
      const formattedStats = {
        averagePosition: 1,
        eigthCount: 0,
        topFourCount: 0,
        topOneCount: 0,
        totalGames: 0,
      };
      roundResultsService.findStatsByPlayer = jest
        .fn()
        .mockResolvedValue(statsRaw);

      const response = await service.getPlayerStats({} as Player, 1, 1);

      expect(response).toStrictEqual(formattedStats);
    });
  });
});
