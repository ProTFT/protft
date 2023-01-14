import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LobbyPlayerInfosModule } from "../lobby-player-infos/lobby-player-infos.module";
import { RoundsModule } from "../rounds/rounds.module";
import { LobbiesResolver } from "./lobbies.resolver";
import { LobbiesService } from "./lobbies.service";
import { LobbyGroup } from "./lobby-group.entity";
import { Lobby } from "./lobby.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lobby, LobbyGroup]),
    RoundsModule,
    LobbyPlayerInfosModule,
  ],
  providers: [LobbiesService, LobbiesResolver],
  exports: [LobbiesService],
})
export class LobbiesModule {}
