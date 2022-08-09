import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoundsModule } from "../rounds/rounds.module";
import { LobbiesResolver } from "./lobbies.resolver";
import { LobbiesService } from "./lobbies.service";
import { Lobby } from "./lobby.entity";
import { RoundResultsModule } from "../round-results/round-results.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lobby]),
    RoundsModule,
    RoundResultsModule,
  ],
  providers: [LobbiesService, LobbiesResolver],
  exports: [LobbiesService],
})
export class LobbiesModule {}
