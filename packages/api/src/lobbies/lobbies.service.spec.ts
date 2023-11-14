import { Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { LobbyPlayerInfosService } from "../lobby-player-infos/lobby-player-infos.service";
import { CreateLobbyGroupArgs } from "./dto/create-lobby-group.dto";
import { CreateLobbyArgs } from "./dto/create-lobby.args";
import { CreatePlayerLobbyGroupArgs } from "./dto/create-player-lobby-group.args";
import { LobbiesService } from "./lobbies.service";
import { LobbyGroup } from "./lobby-group.entity";
import { Lobby } from "./lobby.entity";

describe("LobbiesService", () => {
  let service: LobbiesService;
  const mockId = 1;
  let lobbyRepository: Repository<Lobby>;
  let lobbyGroupsRepository: Repository<LobbyGroup>;
  let lobbyPlayerInfosService: LobbyPlayerInfosService;

  beforeEach(async () => {
    lobbyRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    } as unknown as Repository<Lobby>;
    lobbyGroupsRepository = {
      findOne: jest.fn().mockResolvedValue({ sequence: 1 }),
      find: jest.fn(),
      save: jest.fn(),
      softDelete: jest.fn(),
    } as unknown as Repository<LobbyGroup>;
    lobbyPlayerInfosService = {
      createManyLobbyPlayersFromGroupedData: jest.fn(),
    } as unknown as LobbyPlayerInfosService;
    service = new LobbiesService(
      lobbyRepository,
      lobbyGroupsRepository,
      lobbyPlayerInfosService,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Lobby Operations", () => {
    describe("find one with relations", () => {
      it("should call repository and pass relations", async () => {
        const relations = ["any", "any.other"];
        await service.findOneWithRelations(mockId, relations);
        expect(lobbyRepository.findOne).toHaveBeenCalledWith(mockId, {
          relations,
        });
      });
    });

    describe("find all by stage", () => {
      it("should call repository", async () => {
        await service.findAllByStage(mockId);
        expect(lobbyRepository.find).toHaveBeenCalled();
      });
    });

    describe("find all by lobby group", () => {
      it("should call repository", async () => {
        await service.findAllByLobbyGroup(mockId);
        expect(lobbyRepository.find).toHaveBeenCalled();
      });
    });

    describe("create one", () => {
      it("should just call repository if name is passed", async () => {
        await service.createOne({ name: "name" } as CreateLobbyArgs);
        expect(lobbyGroupsRepository.findOne).not.toHaveBeenCalled();
        expect(lobbyRepository.save).toHaveBeenCalled();
      });

      it("if name is not passed, should fetch lobby group and create name", async () => {
        await service.createOne({} as CreateLobbyArgs);
        expect(lobbyGroupsRepository.findOne).toHaveBeenCalled();
        expect(lobbyRepository.save).toHaveBeenCalled();
      });
    });

    describe("create many", () => {
      it("should call repository", async () => {
        await service.createMany([{}, {}] as CreateLobbyArgs[]);
        expect(lobbyRepository.save).toHaveBeenCalled();
      });
    });

    describe("create N", () => {
      it("should call repository with several lobbies", async () => {
        const lobbyQuantity = 2;
        await service.createN(mockId, mockId, lobbyQuantity);
        expect(lobbyRepository.save).toHaveBeenCalledWith(
          expect.arrayContaining([
            { stageId: mockId, lobbyGroupId: mockId, sequence: 1, name: "A1" },
            { stageId: mockId, lobbyGroupId: mockId, sequence: 2, name: "B1" },
          ]),
        );
      });
    });

    describe("update one", () => {
      it("if lobby does not exist, should throw error", async () => {
        lobbyRepository.findOne = jest.fn().mockResolvedValueOnce(undefined);
        expect(
          async () =>
            await service.updateOne({
              id: mockId,
              name: "Test",
              stageId: mockId,
              lobbyGroupId: mockId,
              sequence: 1,
            }),
        ).rejects.toThrow();
      });

      it("if it exists, should update and return entity", async () => {
        lobbyRepository.findOne = jest.fn().mockResolvedValueOnce({});
        await service.updateOne({
          id: mockId,
          name: "Test",
          stageId: mockId,
          lobbyGroupId: mockId,
          sequence: 1,
        });
        expect(lobbyRepository.update).toHaveBeenCalled();
        expect(lobbyRepository.findOne).toHaveBeenCalled();
      });
    });

    describe("delete one", () => {
      it("should call repository", async () => {
        const response = await service.deleteOne(mockId);
        expect(lobbyRepository.softDelete).toHaveBeenCalled();
        expect(response).toBeInstanceOf(DeleteResponse);
      });
    });

    describe("delete many lobby groups", () => {
      it("should call repository", async () => {
        const response = await service.deleteManyLobbyGroups(mockId);
        expect(lobbyGroupsRepository.softDelete).toHaveBeenCalled();
        expect(response).toBeInstanceOf(DeleteResponse);
      });
    });
  });

  describe("Lobby group operations", () => {
    describe("find one", () => {
      it("should call repository", async () => {
        await service.findOneLobbyGroup(mockId);
        expect(lobbyGroupsRepository.findOne).toHaveBeenCalled();
      });
    });

    describe("find all by stage", () => {
      it("should call repository", async () => {
        await service.findAllLobbyGroupsByStage(mockId);
        expect(lobbyGroupsRepository.find).toHaveBeenCalled();
      });
    });

    describe("create one", () => {
      it("should call repository", async () => {
        await service.createOneLobbyGroup({} as CreateLobbyGroupArgs);
        expect(lobbyGroupsRepository.save).toHaveBeenCalled();
      });
    });

    describe("create many", () => {
      it("should call repository", async () => {
        await service.createManyLobbyGroup([{}, {}] as CreateLobbyGroupArgs[]);
        expect(lobbyGroupsRepository.save).toHaveBeenCalled();
      });
    });

    describe("create N", () => {
      it("should call repository with several lobby groups", async () => {
        const lobbyGroupQuantity = 2;
        const roundsPlayed = 5;
        await service.createNLobbyGroup(
          mockId,
          lobbyGroupQuantity,
          roundsPlayed,
        );
        expect(lobbyGroupsRepository.save).toHaveBeenCalledWith(
          expect.arrayContaining([
            { stageId: mockId, roundsPlayed, sequence: 1 },
            { stageId: mockId, roundsPlayed, sequence: 2 },
          ]),
        );
      });
    });
  });

  describe("Player Lobby Group operations", () => {
    it("should create players for each lobby", async () => {
      const firstLobbyPlayers = {
        lobbyId: 1,
        playerIds: [1, 2, 3],
      };
      const secondLobbyPlayers = {
        lobbyId: 2,
        playerIds: [4, 5, 6],
      };
      const payload: CreatePlayerLobbyGroupArgs = {
        lobbies: [firstLobbyPlayers, secondLobbyPlayers],
      };
      await service.createPlayerLobbyGroup(payload);
      expect(
        lobbyPlayerInfosService.createManyLobbyPlayersFromGroupedData,
      ).toHaveBeenCalledTimes(2);
      expect(
        lobbyPlayerInfosService.createManyLobbyPlayersFromGroupedData,
      ).toHaveBeenCalledWith(firstLobbyPlayers);
      expect(
        lobbyPlayerInfosService.createManyLobbyPlayersFromGroupedData,
      ).toHaveBeenCalledWith(secondLobbyPlayers);
    });
  });
});
