import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Player } from "../players/player.entity";
import { CreateLobbyArgs } from "./dto/create-lobby.args";
import { CreatePlayerLobbyArgs } from "./dto/create-player-lobby.args";
import { Lobby } from "./lobby.entity";

@Injectable()
export class LobbiesService {
  constructor(
    @InjectRepository(Lobby) private lobbiesRepository: Repository<Lobby>,
  ) {}

  findOneWithPlayers(lobbyId: number): Promise<Lobby> {
    return this.lobbiesRepository.findOne(lobbyId, {
      relations: ["players"],
    });
  }

  findAllByStage(stageId: number): Promise<Lobby[]> {
    return this.lobbiesRepository.find({ where: { stageId } });
  }

  createOne(payload: CreateLobbyArgs): Promise<Lobby> {
    return this.lobbiesRepository.save(payload);
  }

  async createPlayerLobby(payload: CreatePlayerLobbyArgs): Promise<any> {
    const { lobbyId, playerIds } = payload;
    const lobby = await this.lobbiesRepository.findOne(lobbyId);
    const playerObjects = playerIds.map((id: number) => ({
      id,
    }));
    lobby.players = playerObjects as Player[];
    return this.lobbiesRepository.save(lobby);
  }
}
