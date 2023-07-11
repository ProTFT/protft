import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LobbyPlayerInfosModule } from "../lobby-player-infos/lobby-player-infos.module";
import { PlayerLinksModule } from "../player-links/player-links.module";
import { RoundResultsModule } from "../round-results/round-results.module";
import { StagePlayerInfosModule } from "../stage-player-infos/stage-player-infos.module";
import { TournamentResultsModule } from "../tournament-results/tournament-results.module";
import { TournamentsModule } from "../tournaments/tournaments.module";
import { Player } from "./player.entity";
import { PlayersExternalController } from "./players-external.controller";
import { PlayersController } from "./players.controller";
import { PlayersResolver } from "./players.resolver";
import { PlayersService } from "./players.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    RoundResultsModule,
    TournamentResultsModule,
    TournamentsModule,
    StagePlayerInfosModule,
    LobbyPlayerInfosModule,
    PlayerLinksModule,
  ],
  providers: [PlayersService, PlayersResolver],
  exports: [PlayersService],
  controllers: [PlayersController, PlayersExternalController],
})
export class PlayersModule {}
