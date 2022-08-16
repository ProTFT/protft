import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoundResult } from "./round-result.entity";
import { RoundResultsService } from "./round-results.service";
import { RoundResultsFacade } from "./round-results.facade";
import { RoundResultsResolver } from "./round-result.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([RoundResult])],
  providers: [RoundResultsService, RoundResultsFacade, RoundResultsResolver],
  exports: [RoundResultsService, RoundResultsFacade],
})
export class RoundResultsModule {}
