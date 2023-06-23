import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { DeleteResponse } from "../lib/dto/delete-return";
import { CreatePlayerLinkArgs } from "./dto/create-player-link.args";
import { DeletePlayerLinkArgs } from "./dto/delete-player-link.args";
import { GetPlayerLinkArgs } from "./dto/get-player-link.args";
import { UpdatePlayerLinkArgs } from "./dto/update-player-link.args";
import { PlayerLink } from "./player-link.entity";
import { PlayerLinksService } from "./player-links.service";

@Resolver(() => PlayerLink)
export class PlayerLinksResolver {
  constructor(private playerLinksService: PlayerLinksService) {}

  @Query(() => PlayerLink)
  async playerLink(@Args() { id }: GetPlayerLinkArgs) {
    return this.playerLinksService.findOne(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => PlayerLink)
  async createPlayerLink(@Args() payload: CreatePlayerLinkArgs) {
    return this.playerLinksService.createOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => PlayerLink)
  async updatePlayerLink(@Args() payload: UpdatePlayerLinkArgs) {
    return this.playerLinksService.updateOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => DeleteResponse)
  async deletePlayerLink(@Args() payload: DeletePlayerLinkArgs) {
    return this.playerLinksService.deleteOne(payload);
  }
}
