import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoundResult } from "./round-result.entity";
import { RoundResultsService } from "./round-results.service";
import { RoundResultsFacade } from "./round-results.facade";
import { RoundResultsResolver } from "./round-result.resolver";
import { StagesModule } from "../stages/stages.module";

@Module({
  imports: [TypeOrmModule.forFeature([RoundResult]), StagesModule],
  providers: [RoundResultsService, RoundResultsFacade, RoundResultsResolver],
  exports: [RoundResultsService, RoundResultsFacade],
})
export class RoundResultsModule {}
