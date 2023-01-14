import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePlayerLobbyArgs } from "../graphql";
import { LobbyPlayerInfo } from "./lobby-player-info.entity";

@Injectable()
export class LobbyPlayerInfosService {
  constructor(
    @InjectRepository(LobbyPlayerInfo)
    private lobbyPlayerInfoRepository: Repository<LobbyPlayerInfo>,
  ) {}

  async createLobbyPlayer({
    lobbyId,
    playerIds,
  }: CreatePlayerLobbyArgs): Promise<LobbyPlayerInfo[]> {
    const savePayload = playerIds.map((playerId) => ({
      lobbyId,
      playerId,
    })) as LobbyPlayerInfo[];
    return this.lobbyPlayerInfoRepository.save(savePayload);
  }
}
