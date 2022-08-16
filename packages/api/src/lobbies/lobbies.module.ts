import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoundsModule } from "../rounds/rounds.module";
import { LobbiesResolver } from "./lobbies.resolver";
import { LobbiesService } from "./lobbies.service";
import { Lobby } from "./lobby.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Lobby]), RoundsModule],
  providers: [LobbiesService, LobbiesResolver],
  exports: [LobbiesService],
})
export class LobbiesModule {}
