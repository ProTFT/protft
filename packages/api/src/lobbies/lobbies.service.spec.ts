import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { lobby } from "../../test/generators/lobby";
import { FakeIndexedRepository } from "../../test/stubs/fakeRepository";
import { CreateLobbyArgs } from "./dto/create-lobby.args";
import { CreatePlayerLobbyArgs } from "./dto/create-player-lobby.args";
import { LobbiesService } from "./lobbies.service";
import { Lobby } from "./lobby.entity";

describe("LobbiesService", () => {
  let service: LobbiesService;
  const stageIdWithLobbies = 1;
  const stageIdWithoutLobbies = 4;
  const lobbyIdWithPlayers = 5;
  const lobbyRepository = new FakeIndexedRepository<Lobby>([
    lobby({ id: 1, stageId: stageIdWithLobbies }),
    lobby({ id: 2, stageId: stageIdWithLobbies }),
    lobby({ id: 3 }),
    lobby({ id: 4 }),
    lobby({ id: lobbyIdWithPlayers, players: [] }),
  ]);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LobbiesService,
        {
          provide: getRepositoryToken(Lobby),
          useValue: lobbyRepository,
        },
      ],
    }).compile();

    service = module.get<LobbiesService>(LobbiesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("find all by stage", () => {
    it("should find lobbies by stage", async () => {
      expect(await service.findAllByStage(stageIdWithLobbies)).toHaveLength(2);
    });

    it("should find no lobbies if stage does not have it", async () => {
      expect(await service.findAllByStage(stageIdWithoutLobbies)).toHaveLength(
        0,
      );
    });
  });

  describe("find one with players", () => {
    it("should find one with players", async () => {
      expect(await service.findOneWithPlayers(1)).toBeTruthy();
    });

    it("should not find one if it doesn't exist", async () => {
      expect(await service.findOneWithPlayers(13232)).toBeUndefined();
    });
  });

  describe("create one", () => {
    it("should be able to create a new lobby", async () => {
      const stageId = 100;
      const payload: CreateLobbyArgs = {
        name: "anyName",
        sequence: 0,
        stageId,
      };
      const lobbyCount = (await service.findAllByStage(stageId)).length;
      await service.createOne(payload);
      expect(await service.findAllByStage(stageId)).toHaveLength(
        lobbyCount + 1,
      );
    });
  });

  describe("create player lobby", () => {
    it("should be able to create player x lobby", async () => {
      const lobbyId = lobbyIdWithPlayers;
      const playerIds = [1, 2, 3];
      const expectedPlayers = playerIds.map((id) => ({
        id,
      }));
      const payload: CreatePlayerLobbyArgs = {
        lobbyId,
        playerIds,
      };
      await service.createPlayerLobby(payload);
      expect((await service.findOneWithPlayers(lobbyId)).players).toStrictEqual(
        expectedPlayers,
      );
    });
  });
});
