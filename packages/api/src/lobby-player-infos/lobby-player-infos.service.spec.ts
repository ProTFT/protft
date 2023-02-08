import { Repository } from "typeorm";
import {
  CreateManyLobbyPlayerInfoArgs,
  CreateOneLobbyPlayerInfoArgs,
} from "./dto/create-lobby-player-info.args";
import { LobbyPlayerInfo } from "./lobby-player-info.entity";
import { LobbyPlayerInfosService } from "./lobby-player-infos.service";

describe("LobbyPlayerInfos Service", () => {
  let service: LobbyPlayerInfosService;
  const mockId = 1;
  const lobbyPlayerInfoRepository = {
    save: jest.fn(),
  } as unknown as Repository<LobbyPlayerInfo>;

  beforeEach(async () => {
    service = new LobbyPlayerInfosService(lobbyPlayerInfoRepository);
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

    it("creating from consolidated object, should call repository", async () => {
      await service.createManyLobbyPlayersFromGroupedData({
        lobbyId: mockId,
        playerIds: [1, 2, 3],
      } as CreateManyLobbyPlayerInfoArgs);
      expect(lobbyPlayerInfoRepository.save).toHaveBeenCalled();
    });
  });
});
