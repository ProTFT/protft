import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LobbiesResolver } from "./lobbies.resolver";
import { LobbiesService } from "./lobbies.service";
import { Lobby } from "./lobby.entity";
import { RoundResult } from "./round-result.entity";
import { Round } from "./round.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Lobby, Round, RoundResult])],
  providers: [LobbiesService, LobbiesResolver],
  exports: [LobbiesService],
})
export class LobbiesModule {}
