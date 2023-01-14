import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LobbyPlayerInfo } from "./lobby-player-info.entity";
import { LobbyPlayerInfosService } from "./lobby-player-infos.service";

@Module({
  imports: [TypeOrmModule.forFeature([LobbyPlayerInfo])],
  providers: [LobbyPlayerInfosService],
  exports: [LobbyPlayerInfosService],
})
export class LobbyPlayerInfosModule {}
