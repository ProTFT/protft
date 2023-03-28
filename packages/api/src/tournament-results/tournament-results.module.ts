import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoundResultsModule } from "../round-results/round-results.module";
import { StagesModule } from "../stages/stages.module";
import { TournamentResult } from "./tournament-result.entity";
import { TournamentResultsResolver } from "./tournament-results.resolver";
import { TournamentResultsService } from "./tournament-results.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([TournamentResult]),
    StagesModule,
    RoundResultsModule,
  ],
  providers: [TournamentResultsService, TournamentResultsResolver],
  exports: [TournamentResultsService],
})
export class TournamentResultsModule {}
