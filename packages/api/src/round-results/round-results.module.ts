import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoundResult } from "./round-result.entity";
import { RoundResultsService } from "./round-results.service";
import { RoundResultsResolver } from "./round-result.resolver";
import { StagesModule } from "../stages/stages.module";
import { LobbiesModule } from "../lobbies/lobbies.module";
import { LobbyPlayerInfosModule } from "../lobby-player-infos/lobby-player-infos.module";
import { RoundResultsController } from "./round-results.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoundResult]),
    StagesModule,
    LobbiesModule,
    LobbyPlayerInfosModule,
  ],
  providers: [RoundResultsService, RoundResultsResolver],
  exports: [RoundResultsService],
  controllers: [RoundResultsController],
})
export class RoundResultsModule {}
