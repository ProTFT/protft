import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import { LobbyPlayerInfosService } from "../lobby-player-infos/lobby-player-infos.service";
import { CreateLobbyArgs } from "./dto/create-lobby.args";
import { CreatePlayerLobbyGroupArgs } from "./dto/create-player-lobby-group.args";
import { UpdateLobbyArgs } from "./dto/update-lobby.args";
import { LobbyGroup } from "./lobby-group.entity";
import { Lobby } from "./lobby.entity";

@Injectable()
export class LobbiesService {
  constructor(
    @InjectRepository(Lobby) private lobbiesRepository: Repository<Lobby>,
    @InjectRepository(LobbyGroup)
    private lobbyGroupsRepository: Repository<LobbyGroup>,
    private lobbyPlayerInfosService: LobbyPlayerInfosService,
  ) {}

  findOneWithPlayers(lobbyId: number): Promise<Lobby> {
    return this.lobbiesRepository.findOne(lobbyId, {
      relations: ["players", "players.player"],
    });
  }

  findOneLobbyGroup(lobbyGroupId: number): Promise<LobbyGroup> {
    return this.lobbyGroupsRepository.findOne(lobbyGroupId);
  }

  findAllByStage(stageId: number): Promise<Lobby[]> {
    return this.lobbiesRepository.find({ where: { stageId } });
  }

  findAllByLobbyGroup(lobbyGroupId: number): Promise<Lobby[]> {
    return this.lobbiesRepository.find({ where: { lobbyGroupId } });
  }

  findAllLobbyGroupsByStage(stageId: number): Promise<LobbyGroup[]> {
    return this.lobbyGroupsRepository.find({
      where: { stageId },
      order: { sequence: "ASC" },
    });
  }

  createOne(payload: CreateLobbyArgs): Promise<Lobby> {
    return this.lobbiesRepository.save(payload);
  }

  async createPlayerLobbyGroup(
    payload: CreatePlayerLobbyGroupArgs,
  ): Promise<LobbyPlayerInfo[]> {
    const { lobbyGroupId, players } = payload;
    const formattedData = players.reduce(
      (prev, { lobbyId, playerIds }) => ({
        ...prev,
        [lobbyId]: playerIds.map((id) => id),
      }),
      {},
    );
    const lobbies = await this.findAllByLobbyGroup(lobbyGroupId);
    const requests = lobbies.map((lobby) => {
      return this.lobbyPlayerInfosService.createLobbyPlayer({
        lobbyId: lobby.id,
        playerIds: formattedData[String(lobby.id)],
      });
    });
    const responses = await Promise.all(requests);
    return responses.flatMap((a) => a);
  }

  async updateOne({ id, ...rest }: UpdateLobbyArgs): Promise<Lobby> {
    const lobby = await this.lobbiesRepository.findOne(id);
    if (!lobby) {
      throw new NotFoundException();
    }
    await this.lobbiesRepository.update({ id }, rest);
    return this.lobbiesRepository.findOne(id);
  }

  async deleteOne(id: number): Promise<DeleteResponse> {
    await this.lobbiesRepository.delete({ id });
    return new DeleteResponse(id);
  }

  createLobbyGroup({
    roundsPlayed,
    sequence,
    stageId,
  }: Pick<
    LobbyGroup,
    "roundsPlayed" | "sequence" | "stageId"
  >): Promise<LobbyGroup> {
    return this.lobbyGroupsRepository.save({
      roundsPlayed,
      sequence,
      stageId,
    });
  }

  createManyLobbyGroup(
    lobbyGroups: Pick<LobbyGroup, "roundsPlayed" | "sequence" | "stageId">[],
  ): Promise<LobbyGroup[]> {
    return this.lobbyGroupsRepository.save(lobbyGroups as any);
  }

  createMany(lobbies: CreateLobbyArgs[]) {
    return this.lobbiesRepository.save(lobbies);
  }
}
