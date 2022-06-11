import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Player } from "./player.entity";
import { PlayersResolver } from "./players.resolver";
import { PlayersService } from "./players.service";

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [PlayersService, PlayersResolver],
  exports: [PlayersService],
})
export class PlayersModule {}
