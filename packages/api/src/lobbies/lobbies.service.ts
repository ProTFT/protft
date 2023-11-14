import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { SEQUENCE_SORTING } from "../lib/Sorting";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import { LobbyPlayerInfosService } from "../lobby-player-infos/lobby-player-infos.service";
import { CreateLobbyGroupArgs } from "./dto/create-lobby-group.dto";
import { CreateLobbyArgs } from "./dto/create-lobby.args";
import { CreatePlayerLobbyGroupArgs } from "./dto/create-player-lobby-group.args";
import { UpdateLobbyArgs } from "./dto/update-lobby.args";
import { LobbyGroup } from "./lobby-group.entity";
import { Lobby } from "./lobby.entity";
import { createLobbyName } from "./lobby.logic";

@Injectable()
export class LobbiesService {
  constructor(
    @InjectRepository(Lobby) private lobbiesRepository: Repository<Lobby>,
    @InjectRepository(LobbyGroup)
    private lobbyGroupsRepository: Repository<LobbyGroup>,
    private lobbyPlayerInfosService: LobbyPlayerInfosService,
  ) {}

  findOneWithRelations(lobbyId: number, relations: string[]): Promise<Lobby> {
    return this.lobbiesRepository.findOne(lobbyId, {
      relations,
    });
  }

  findAllByStage(stageId: number): Promise<Lobby[]> {
    return this.lobbiesRepository.find({
      where: { stageId },
      ...SEQUENCE_SORTING,
    });
  }

  findAllByLobbyGroup(lobbyGroupId: number): Promise<Lobby[]> {
    return this.lobbiesRepository.find({
      where: { lobbyGroupId },
      ...SEQUENCE_SORTING,
    });
  }

  async createOne({
    lobbyGroupId,
    sequence,
    stageId,
    name,
  }: CreateLobbyArgs): Promise<Lobby> {
    const lobbyName =
      name || (await this.createLobbyName(lobbyGroupId, sequence));
    return this.lobbiesRepository.save({
      lobbyGroupId,
      sequence,
      stageId,
      name: lobbyName,
    });
  }

  async createN(stageId: number, lobbyGroupId: number, quantity: number) {
    const { sequence: lobbyGroupSequence } = await this.findOneLobbyGroup(
      lobbyGroupId,
    );
    const lobbies: CreateLobbyArgs[] = new Array(quantity)
      .fill(1)
      .map((_, index) => ({
        sequence: index + 1,
        stageId,
        lobbyGroupId,
        name: createLobbyName(lobbyGroupSequence, index + 1),
      }));
    return this.createMany(lobbies);
  }

  createMany(lobbies: CreateLobbyArgs[]) {
    return this.lobbiesRepository.save(lobbies);
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
    await this.lobbiesRepository.softDelete({ id });
    return new DeleteResponse(id);
  }

  async deleteManyLobbyGroups(stageId: number): Promise<DeleteResponse> {
    await this.lobbyGroupsRepository.softDelete({ stageId });
    return new DeleteResponse(stageId);
  }

  findOneLobbyGroup(lobbyGroupId: number): Promise<LobbyGroup> {
    return this.lobbyGroupsRepository.findOne(lobbyGroupId);
  }

  findAllLobbyGroupsByStage(stageId: number): Promise<LobbyGroup[]> {
    return this.lobbyGroupsRepository.find({
      where: { stageId },
      ...SEQUENCE_SORTING,
    });
  }

  createOneLobbyGroup({
    roundsPlayed,
    sequence,
    stageId,
  }: CreateLobbyGroupArgs): Promise<LobbyGroup> {
    return this.lobbyGroupsRepository.save({
      roundsPlayed,
      sequence,
      stageId,
    });
  }

  createNLobbyGroup(stageId: number, quantity: number, roundsPlayed: number) {
    const lobbyGroups: CreateLobbyGroupArgs[] = new Array(quantity)
      .fill(1)
      .map((_, index) => ({
        roundsPlayed,
        sequence: index + 1,
        stageId,
      }));
    return this.createManyLobbyGroup(lobbyGroups);
  }

  createManyLobbyGroup(
    lobbyGroups: CreateLobbyGroupArgs[],
  ): Promise<LobbyGroup[]> {
    return this.lobbyGroupsRepository.save(lobbyGroups);
  }

  async createPlayerLobbyGroup(
    payload: CreatePlayerLobbyGroupArgs,
  ): Promise<LobbyPlayerInfo[]> {
    const { lobbies } = payload;
    const formattedData = lobbies.reduce(
      (prev, { lobbyId, playerIds }) => ({
        ...prev,
        [lobbyId]: playerIds.map((id) => id),
      }),
      {},
    );
    const requests = lobbies.map((lobby) => {
      return this.lobbyPlayerInfosService.createManyLobbyPlayersFromGroupedData(
        {
          lobbyId: lobby.lobbyId,
          playerIds: formattedData[String(lobby.lobbyId)],
        },
      );
    });
    const responses = await Promise.all(requests);
    return responses.flat();
  }

  private async createLobbyName(
    lobbyGroupId: number,
    lobbySequence: number,
  ): Promise<string> {
    const lobbyGroup = await this.findOneLobbyGroup(lobbyGroupId);
    return createLobbyName(lobbyGroup.sequence, lobbySequence);
  }
}
