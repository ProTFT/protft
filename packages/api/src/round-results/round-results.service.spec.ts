import { Repository } from "typeorm";
import { lobby } from "../../test/generators/lobby";
import { lobbyGroup } from "../../test/generators/lobby-group";
import { player } from "../../test/generators/player";
import { stage } from "../../test/generators/stage";
import { formatString } from "../../test/helpers/File";
import { LobbiesService } from "../lobbies/lobbies.service";
import { LobbyPlayerInfosService } from "../lobby-player-infos/lobby-player-infos.service";
import { RoundsService } from "../rounds/rounds.service";
import { StagePlayerInfosService } from "../stage-player-infos/stage-player-infos.service";
import { StagesService } from "../stages/stages.service";
import { tiebreakerMap } from "../stages/tiebreaker.logic";
import { CreateLobbyGroupResultArgs } from "./dto/create-lobby-group-result.args";
import { fromRawToConsolidatedRoundResults } from "./round-result.adapter";
import { RoundResult } from "./round-result.entity";
import { SortingMethods } from "./round-result.logic";
import { RoundResultsService } from "./round-results.service";

jest.mock("./bulk-creation.logic", () => ({
  buildResults: jest.fn(),
  createRoundResultEntries: jest.fn(),
  extractLobbyPlayerEntries: jest.fn(),
  sortLobbies: jest.fn(),
}));

class FakeQueryBuilder {
  public andWhereCount = 0;
  public orderByClause = null;
  public takeSpy = null;
  public skipSpy = null;

  public resetAllMocks() {
    this.andWhereCount = 0;
    this.orderByClause = null;
    this.takeSpy = null;
    this.skipSpy = null;
  }

  public select() {
    return this;
  }

  public addSelect() {
    return this;
  }

  public from(
    subqueryOrTable: string | ((subquery: FakeQueryBuilder) => void),
  ) {
    if (subqueryOrTable instanceof Function) {
      subqueryOrTable(this);
    }
    return this;
  }

  public innerJoin() {
    return this;
  }

  public groupBy() {
    return this;
  }

  public andWhere() {
    this.andWhereCount++;
    return this;
  }

  public where() {
    return this;
  }

  public orderBy(clause: string) {
    this.orderByClause = clause;
    return this;
  }

  public addOrderBy() {
    return this;
  }

  public take(quantity: number) {
    this.takeSpy = quantity;
    return this;
  }

  public skip(quantity: number) {
    this.skipSpy = quantity;
    return this;
  }

  public leftJoin() {
    return this;
  }

  public getRawMany() {
    return [mockRawResults];
  }

  public getRawOne() {
    return mockRawResults;
  }
}

const mockRawResults = {
  roundId: 1,
  position: 1,
  id: 1,
  playerId: 1,
  sequence: 1,
  name: "name",
  region: "region",
  country: "country",
  slug: "slug",
  alias: ["alias1", "alias2"],
  points: 5,
  extraPoints: 0,
  tiebreakerRanking: 1,
};

const mockStagePlayers = [
  {
    player: player({}),
    positions: [],
    points: [],
    lobbyPlayerId: 0,
    pastPoints: 0,
    pastPositions: [],
    tiebreakerRanking: 0,
  },
  {
    player: player({}),
    positions: [],
    points: [],
    lobbyPlayerId: 0,
    pastPoints: 0,
    pastPositions: [],
    tiebreakerRanking: 0,
  },
];

describe("RoundResults service", () => {
  let service: RoundResultsService;
  let roundResultsRepository: Repository<RoundResult>;
  let stagesService: StagesService;
  let lobbyPlayerInfosService: LobbyPlayerInfosService;
  let lobbiesService: LobbiesService;
  let roundsService: RoundsService;
  let stagePlayerInfosService: StagePlayerInfosService;
  const fakeQueryBuilder = new FakeQueryBuilder();

  beforeEach(() => {
    stagesService = {
      findOne: jest
        .fn()
        .mockResolvedValue(stage({ lobbyGroups: [lobbyGroup({})] })),
      findAllByTournament: jest.fn(),
    } as unknown as StagesService;

    lobbyPlayerInfosService = {
      createManyLobbyPlayers: jest.fn(),
    } as unknown as LobbyPlayerInfosService;

    lobbiesService = {
      findOneLobbyGroup: jest.fn().mockResolvedValue({
        roundsPlayed: 2,
        sequence: 1,
        stageId: 1,
      }),
      findAllLobbyGroupsByStage: jest.fn().mockResolvedValue([lobbyGroup({})]),
      findAllByLobbyGroup: jest.fn(),
      findAllByStage: jest.fn(),
    } as unknown as LobbiesService;

    roundsService = {
      findByStage: jest.fn(),
    } as unknown as RoundsService;

    roundResultsRepository = {
      save: jest.fn(),
      manager: {
        createQueryBuilder: () => fakeQueryBuilder,
      },
    } as unknown as Repository<RoundResult>;

    stagePlayerInfosService = {
      findAllByStage: jest.fn().mockResolvedValue(mockStagePlayers),
    } as unknown as StagePlayerInfosService;

    service = new RoundResultsService(
      roundResultsRepository,
      stagesService,
      lobbyPlayerInfosService,
      lobbiesService,
      roundsService,
      stagePlayerInfosService,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    fakeQueryBuilder.resetAllMocks();
  });

  describe("createResults", () => {
    it("should create on repository", async () => {
      stagesService.findOne = jest.fn().mockResolvedValue({
        rounds: [
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
        ],
      });

      const payload: CreateLobbyGroupResultArgs = {
        lobbyGroupId: 1,
        results: [{ lobbyPlayerId: 1, positions: [1, 2] }],
      };
      await service.createResults(payload);
      expect(roundResultsRepository.save).toHaveBeenCalled();
    });
  });

  describe("createBulk", () => {
    it("if file does not have correct headers, should throw error", async () => {
      const fileString = formatString(`
        Name,Country,Region
        Lucas,BRA,BR
        Pedro,GBR,EMEA
      `);
      expect(
        async () => await service.createBulk(fileString, 1, false),
      ).rejects.toThrowError(`Name - Country`);
    });

    it("if number of lines does not match number of players, should throw error", async () => {
      stagesService.findOne = jest.fn().mockResolvedValue({
        players: [{}, {}],
      });
      const fileString = formatString(`
          Player,Position
          Lucas,1
          Pedro,2
          Lucas,2
        `);
      expect(
        async () => await service.createBulk(fileString, 1, false),
      ).rejects.toThrowError(
        `Number of lines does not match number of stage players`,
      );
    });

    it("if number of lines does not match number of lobby groups, should throw error", async () => {
      // 2 players in 1 lobby group, should have 2 results
      stagesService.findOne = jest.fn().mockResolvedValue({
        players: [{}, {}],
        lobbyGroups: [{}],
      });
      const fileString = formatString(`
            Player,Position
            Lucas,1
            Pedro,2
            Lucas,2
            Pedro,1
          `);
      expect(
        async () => await service.createBulk(fileString, 1, false),
      ).rejects.toThrowError(
        `Number of lines does not match number of lobby groups`,
      );
    });

    it("should save", async () => {
      stagesService.findOne = jest.fn().mockResolvedValue({
        players: [{}, {}],
        lobbyGroups: [{}],
      });
      const fileString = formatString(`
            Player,Position
            Lucas,1
            Pedro,2
          `);
      await service.createBulk(fileString, 1, false);

      expect(lobbyPlayerInfosService.createManyLobbyPlayers).toHaveBeenCalled();
      expect(roundResultsRepository.save).toHaveBeenCalled();
    });
  });

  describe("overviewResultsByStage", () => {
    it("should get data from DB and format", async () => {
      stagesService.findOne = jest.fn().mockResolvedValue({
        tournamentId: 1,
        sequence: 1,
        lobbyGroups: [lobbyGroup({})],
      });
      const response = await service.overviewResultsByStage(1);
      expect(response).toStrictEqual(
        fromRawToConsolidatedRoundResults([mockRawResults]),
      );
    });

    it("if there are no lobby groups, should return player list", async () => {
      stagesService.findOne = jest.fn().mockResolvedValue({
        tournamentId: 1,
        sequence: 1,
        lobbyGroups: [],
      });
      const response = await service.overviewResultsByStage(1);
      expect(response).toStrictEqual(mockStagePlayers);
    });

    it("if tiebreaker has total event points and is not first stage, should add data from previous stages", async () => {
      stagesService.findOne = jest.fn().mockResolvedValue({
        tiebreakers: [SortingMethods.TOTAL_EVENT_POINTS],
        tournamentId: 1,
        sequence: 2,
        lobbyGroups: [lobbyGroup({})],
      });
      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          tiebreakers: [],
          tournamentId: 1,
          sequence: 1,
        },
        {
          tiebreakers: [],
          tournamentId: 1,
          sequence: 2,
        },
        {
          tiebreakers: [],
          tournamentId: 1,
          sequence: 3,
        },
      ]);
      const response = await service.overviewResultsByStage(1);
      expect(response).toStrictEqual(
        fromRawToConsolidatedRoundResults([mockRawResults]).map((r) => ({
          ...r,
          pastPoints: 5,
          pastPositions: [1],
        })),
      );
    });

    it("if tiebreaker has total event points but its first stage, should not add past points", async () => {
      stagesService.findOne = jest.fn().mockResolvedValue({
        tiebreakers: [SortingMethods.TOTAL_EVENT_POINTS],
        tournamentId: 1,
        sequence: 1,
        lobbyGroups: [lobbyGroup({})],
      });
      stagesService.findAllByTournament = jest.fn().mockResolvedValue([
        {
          tiebreakers: [],
          tournamentId: 1,
          sequence: 1,
        },
        {
          tiebreakers: [],
          tournamentId: 1,
          sequence: 2,
        },
        {
          tiebreakers: [],
          tournamentId: 1,
          sequence: 3,
        },
      ]);
      const response = await service.overviewResultsByStage(1);
      expect(response).toStrictEqual(
        fromRawToConsolidatedRoundResults([mockRawResults]),
      );
    });

    [
      SortingMethods.TOTAL_EVENT_AVG_POS,
      SortingMethods.TOTAL_EVENT_FIRST_PLACE,
      SortingMethods.TOTAL_EVENT_SECOND_PLACE,
    ].map((method) =>
      it(`if tiebreaker has ${tiebreakerMap[method].description}, should add past points`, async () => {
        stagesService.findOne = jest.fn().mockResolvedValue({
          tiebreakers: [method],
          tournamentId: 1,
          sequence: 2,
          lobbyGroups: [lobbyGroup({})],
        });
        stagesService.findAllByTournament = jest.fn().mockResolvedValue([
          {
            tiebreakers: [],
            tournamentId: 1,
            sequence: 1,
          },
          {
            tiebreakers: [],
            tournamentId: 1,
            sequence: 2,
          },
          {
            tiebreakers: [],
            tournamentId: 1,
            sequence: 3,
          },
        ]);
        const response = await service.overviewResultsByStage(1);
        expect(response).toStrictEqual(
          fromRawToConsolidatedRoundResults([mockRawResults]).map((r) => ({
            ...r,
            pastPoints: 5,
            pastPositions: [1],
          })),
        );
      }),
    );
  });

  describe("resultsByLobbyGroup", () => {
    it("should get data from DB and format", async () => {
      const response = await service.resultsByLobbyGroup(1);
      expect(response).toStrictEqual(
        fromRawToConsolidatedRoundResults([mockRawResults]),
      );
    });
  });

  describe("lobbyResultsByStage", () => {
    it("should get data from DB and format", async () => {
      const [firstLobbyGroup, secondLobbyGroup] = [
        lobbyGroup({}),
        lobbyGroup({}),
      ];
      const [firstLobby, secondLobby] = [lobby({}), lobby({})];
      lobbiesService.findAllLobbyGroupsByStage = jest
        .fn()
        .mockResolvedValueOnce([firstLobbyGroup, secondLobbyGroup]);

      lobbiesService.findAllByLobbyGroup = jest
        .fn()
        .mockResolvedValue([firstLobby, secondLobby]);
      const formattedResults = fromRawToConsolidatedRoundResults([
        mockRawResults,
      ]);

      const response = await service.lobbyResultsByStage(1);

      expect(response).toStrictEqual([
        {
          ...firstLobbyGroup,
          lobbies: [
            {
              ...firstLobby,
              results: formattedResults,
            },
            {
              ...secondLobby,
              results: formattedResults,
            },
          ],
        },
        {
          ...secondLobbyGroup,
          lobbies: [
            {
              ...firstLobby,
              results: formattedResults,
            },
            {
              ...secondLobby,
              results: formattedResults,
            },
          ],
        },
      ]);
    });
  });

  describe("playerStats", () => {
    it("should get data from DB and format with no filters", async () => {
      const response = await service.playerStats({});
      expect(response).toStrictEqual([
        {
          player: {
            country: "country",
            id: 1,
            name: "name",
            region: "region",
            slug: "slug",
            alias: ["alias1", "alias2"],
          },
          averagePosition: 0,
          eigthCount: 0,
          topFourCount: 0,
          topOneCount: 0,
          totalGames: 0,
        },
      ]);

      expect(fakeQueryBuilder.andWhereCount).toBe(0);
    });

    it("if filters are passed, should apply", async () => {
      const filterPayload = {
        region: "region",
        setId: 1,
        tournamentIds: [1, 2, 3],
      };
      await service.playerStats(filterPayload);

      expect(fakeQueryBuilder.andWhereCount).toBe(
        Object.keys(filterPayload).length,
      );
    });

    it("if pagination is passed, should apply", async () => {
      await service.playerStats({
        take: 23,
        skip: 40,
      });

      expect(fakeQueryBuilder.takeSpy).toBe(23);
      expect(fakeQueryBuilder.skipSpy).toBe(40);
    });

    it("if sorting is passed, should apply", async () => {
      await service.playerStats({
        sort: {
          column: "lala",
          asc: false,
        },
      });

      expect(fakeQueryBuilder.orderByClause).toStrictEqual({
        'stats."lala"': "DESC",
      });

      await service.playerStats({
        sort: {
          column: "lala",
          asc: true,
        },
      });

      expect(fakeQueryBuilder.orderByClause).toStrictEqual({
        'stats."lala"': "ASC",
      });
    });

    it("if sorting is not passed, should order by average position", async () => {
      await service.playerStats({});

      expect(fakeQueryBuilder.orderByClause).toStrictEqual({
        'stats."averagePosition"': "ASC",
      });
    });
  });

  describe("findStatsByPlayer", () => {
    it("should get data from DB and format with no filters", async () => {
      const response = await service.findStatsByPlayer(1);
      expect(response).toStrictEqual(mockRawResults);

      expect(fakeQueryBuilder.andWhereCount).toBe(0);
    });

    it("if filters are passed, should apply", async () => {
      const filterPayload = {
        setId: 1,
        tournamentId: 1,
      };
      await service.findStatsByPlayer(1, ...Object.values(filterPayload));

      expect(fakeQueryBuilder.andWhereCount).toBe(
        Object.keys(filterPayload).length,
      );
    });
  });
});
