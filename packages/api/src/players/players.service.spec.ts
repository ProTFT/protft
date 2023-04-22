import { BadRequestException } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { formatString } from "../../test/helpers/File";
import { LobbyPlayerInfosService } from "../lobby-player-infos/lobby-player-infos.service";
import { RoundResultsService } from "../round-results/round-results.service";
import { StagePlayerInfosService } from "../stage-player-infos/stage-player-infos.service";
import { TournamentResultsService } from "../tournament-results/tournament-results.service";
import { TournamentsService } from "../tournaments/tournaments.service";
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
    manager: {
      createQueryBuilder: () => ({
        select: jest.fn().mockReturnThis(),
        distinct: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockQueryBuilderValue),
      }),
    },
    createQueryBuilder: () => ({
      select: jest.fn().mockReturnThis(),
      distinct: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue(mockQueryBuilderValue),
      andWhere: jest.fn().mockReturnThis(),
    }),
  } as unknown as Repository<Player>;

  const roundResultsService = {
    findStatsByPlayer: jest.fn(),
  } as unknown as RoundResultsService;

  const tournamentResultsService = {
    updatePlayer: jest.fn(),
  } as unknown as TournamentResultsService;
  const tournamentsService = {
    updatePlayer: jest.fn(),
  } as unknown as TournamentsService;
  const lobbyPlayerInfosService = {
    updatePlayer: jest.fn(),
  } as unknown as LobbyPlayerInfosService;
  const stagePlayersInfosService = {
    updatePlayer: jest.fn(),
  } as unknown as StagePlayerInfosService;

  beforeEach(async () => {
    service = new PlayersService(
      playerRepository,
      roundResultsService,
      tournamentResultsService,
      tournamentsService,
      lobbyPlayerInfosService,
      stagePlayersInfosService,
    );
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
      const alias = ["alias"];

      playerRepository.save = jest.fn().mockResolvedValueOnce({
        id,
        name,
        region,
        country,
        alias,
      });

      await service.createOne({ name, region, country, alias }),
        expect(playerRepository.save).toHaveBeenCalledWith({
          name,
          country,
          region,
          alias,
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
      slug: "Lucas",
    };
    const englishPlayer = {
      country: "GBR",
      name: "Pedro",
      region: "EMEA",
      slug: "Pedro",
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
      mockQueryBuilderValue = {};
      const response = await service.createBulk(fileString, dryRun);
      expect(response).toStrictEqual({
        newPlayers: [],
        repeatedPlayers: expect.arrayContaining([
          brazilianPlayer,
          englishPlayer,
        ]),
        dryRun,
      });
    });

    it("when is not dry run, should save players and update their slugs", async () => {
      playerRepository.find = jest
        .fn()
        .mockResolvedValueOnce([brazilianPlayer, englishPlayer]);
      mockQueryBuilderValue = null;

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
      const tournamentData = {
        id: 1,
        name: "TournamentName",
        setId: 1,
        setName: "Beta",
      };
      mockQueryBuilderValue = [tournamentData];

      const response = await service.findTournamentsPlayed(1);

      expect(response).toStrictEqual([
        {
          ...tournamentData,
          set: {
            id: 1,
            name: "Beta",
          },
        },
      ]);
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

  describe("update one", () => {
    it("should throw if player does not exist", async () => {
      playerRepository.findOne = jest.fn().mockResolvedValue(undefined);

      expect(async () => await service.updateOne(1, {})).rejects.toThrow();
    });

    it("should call repository", async () => {
      const player = { id: 1 };
      const newName = "newName";
      playerRepository.findOne = jest.fn().mockResolvedValue(player);

      const response = await service.updateOne(1, { name: newName });

      expect(playerRepository.update).toHaveBeenCalledWith(
        {
          id: 1,
        },
        { name: newName },
      );
      expect(response).toStrictEqual({ ...player, name: newName });
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

    it("if stats are empty, should return all zero", async () => {
      const statsRaw = undefined;
      const formattedStats = {
        averagePosition: 0,
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

  describe("merge", () => {
    it("should call all different services and then delete", async () => {
      const player = { id: 1 };
      playerRepository.findOne = jest.fn().mockResolvedValue(player);

      await service.merge(1, 1);

      expect(tournamentResultsService.updatePlayer).toHaveBeenCalled();
      expect(tournamentsService.updatePlayer).toHaveBeenCalled();
      expect(stagePlayersInfosService.updatePlayer).toHaveBeenCalled();
      expect(lobbyPlayerInfosService.updatePlayer).toHaveBeenCalled();
      expect(playerRepository.delete).toHaveBeenCalled();
    });
  });
});
