import { In, Repository } from "typeorm";
import {
  CreateManyLobbyPlayerInfoArgs,
  CreateOneLobbyPlayerInfoArgs,
} from "./dto/create-lobby-player-info.args";
import { LobbyPlayerInfo } from "./lobby-player-info.entity";
import { LobbyPlayerInfosService } from "./lobby-player-infos.service";

describe("LobbyPlayerInfos Service", () => {
  let service: LobbyPlayerInfosService;
  let lobbyPlayerInfoRepository: Repository<LobbyPlayerInfo>;
  const mockId = 1;
  const existingPlayers = [
    {
      lobbyId: 1,
      playerId: 10,
    },
    {
      lobbyId: 1,
      playerId: 11,
    },
    {
      lobbyId: 1,
      playerId: 12,
    },
  ];

  beforeEach(async () => {
    lobbyPlayerInfoRepository = {
      save: jest.fn(),
      find: jest.fn().mockResolvedValue(existingPlayers),
      delete: jest.fn(),
      update: jest.fn(),
    } as unknown as Repository<LobbyPlayerInfo>;
    service = new LobbyPlayerInfosService(lobbyPlayerInfoRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create many", () => {
    it("creating from list, should call repository", async () => {
      await service.createManyLobbyPlayers([
        {
          lobbyId: mockId,
          playerId: 1,
        },
        {
          lobbyId: mockId,
          playerId: 2,
        },
        {
          lobbyId: mockId,
          playerId: 3,
        },
      ] as CreateOneLobbyPlayerInfoArgs[]);
      expect(lobbyPlayerInfoRepository.save).toHaveBeenCalled();
    });

    it("creating from consolidated object, should consider already created", async () => {
      await service.createManyLobbyPlayersFromGroupedData({
        lobbyId: mockId,
        playerIds: [10, 13],
      } as CreateManyLobbyPlayerInfoArgs);
      expect(lobbyPlayerInfoRepository.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          lobbyId: mockId,
          playerId: In([11, 12]),
        }),
      );
      expect(lobbyPlayerInfoRepository.save).toHaveBeenCalledWith(
        expect.arrayContaining([
          {
            lobbyId: mockId,
            playerId: 13,
          },
        ]),
      );
    });
  });

  describe("update player", () => {
    it("should update in repo", async () => {
      await service.updatePlayer(10, 11);
      expect(lobbyPlayerInfoRepository.update).toHaveBeenCalledWith(
        { playerId: 10 },
        { playerId: 11 },
      );
    });
  });
});
