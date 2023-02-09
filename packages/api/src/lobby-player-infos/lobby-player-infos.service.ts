import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import {
  CreateManyLobbyPlayerInfoArgs,
  CreateOneLobbyPlayerInfoArgs,
} from "./dto/create-lobby-player-info.args";
import { LobbyPlayerInfo } from "./lobby-player-info.entity";

@Injectable()
export class LobbyPlayerInfosService {
  constructor(
    @InjectRepository(LobbyPlayerInfo)
    private lobbyPlayerInfoRepository: Repository<LobbyPlayerInfo>,
  ) {}

  async createManyLobbyPlayers(
    payload: CreateOneLobbyPlayerInfoArgs[],
  ): Promise<LobbyPlayerInfo[]> {
    return this.lobbyPlayerInfoRepository.save(payload);
  }

  async createManyLobbyPlayersFromGroupedData({
    lobbyId,
    playerIds,
  }: CreateManyLobbyPlayerInfoArgs): Promise<LobbyPlayerInfo[]> {
    const existingLobbyPlayers = await this.lobbyPlayerInfoRepository.find({
      where: {
        lobbyId,
      },
    });
    const existingPlayerIds = existingLobbyPlayers.map((lpi) => lpi.playerId);
    const idsToCreate = playerIds.filter(
      (existing) => !existingPlayerIds.includes(existing),
    );
    const idsToRemove = existingPlayerIds.filter(
      (existing) => !playerIds.includes(existing),
    );
    await this.deleteManyLobbyPlayers(lobbyId, idsToRemove);
    return this.createManyLobbyPlayers(
      idsToCreate.map((playerId) => ({
        lobbyId,
        playerId,
      })),
    );
  }

  private deleteManyLobbyPlayers(lobbyId: number, playerIds: number[]) {
    return this.lobbyPlayerInfoRepository.delete({
      lobbyId,
      playerId: In(playerIds),
    });
  }
}
