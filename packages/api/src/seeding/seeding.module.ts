import { Module } from "@nestjs/common";
import { LobbiesModule } from "../lobbies/lobbies.module";
import { LobbyPlayerInfosModule } from "../lobby-player-infos/lobby-player-infos.module";
import { RoundResultsModule } from "../round-results/round-results.module";
import { StagePlayerInfosModule } from "../stage-player-infos/stage-player-infos.module";
import { StagesModule } from "../stages/stages.module";
import { SeedingService } from "./seeding.service";
import { SeedingResolver } from "./seeding.resolver";

@Module({
  providers: [SeedingService, SeedingResolver],
  imports: [
    LobbiesModule,
    StagePlayerInfosModule,
    LobbyPlayerInfosModule,
    RoundResultsModule,
    StagesModule,
  ],
})
export class SeedingModule {}
