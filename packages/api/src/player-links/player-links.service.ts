import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlayerLink } from "./player-link.entity";

@Injectable()
export class PlayerLinksService {
  constructor(
    @InjectRepository(PlayerLink)
    private playerLinkRepository: Repository<PlayerLink>,
  ) {}

  public getByPlayerId(playerId: number) {
    return this.playerLinkRepository.find({
      playerId,
    });
  }
}
