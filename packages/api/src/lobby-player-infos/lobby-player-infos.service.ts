import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
    const savePayload = playerIds.map((playerId) => ({
      lobbyId,
      playerId,
    })) as LobbyPlayerInfo[];
    return this.createManyLobbyPlayers(savePayload);
  }
}
