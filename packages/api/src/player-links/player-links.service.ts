import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { CreatePlayerLinkArgs } from "./dto/create-player-link.args";
import { DeletePlayerLinkArgs } from "./dto/delete-player-link.args";
import { UpdatePlayerLinkArgs } from "./dto/update-player-link.args";
import { PlayerLink } from "./player-link.entity";

@Injectable()
export class PlayerLinksService {
  constructor(
    @InjectRepository(PlayerLink)
    private playerLinkRepository: Repository<PlayerLink>,
  ) {}

  public findOne(id: number) {
    return this.playerLinkRepository.findOne(id);
  }

  public getByPlayerId(playerId: number) {
    return this.playerLinkRepository.find({
      playerId,
    });
  }

  public createOne(payload: CreatePlayerLinkArgs) {
    return this.playerLinkRepository.save(payload);
  }

  public async updateOne(payload: UpdatePlayerLinkArgs) {
    const { id, ...restOfPayload } = payload;
    await this.playerLinkRepository.update({ id }, restOfPayload);
    return this.findOne(id);
  }

  public async deleteOne({ id }: DeletePlayerLinkArgs) {
    await this.playerLinkRepository.softDelete({ id: id });
    return new DeleteResponse(id);
  }
}
