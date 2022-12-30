import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoundResult } from "./round-result.entity";
import { RoundResultsService } from "./round-results.service";
import { RoundResultsResolver } from "./round-result.resolver";
import { StagesModule } from "../stages/stages.module";

@Module({
  imports: [TypeOrmModule.forFeature([RoundResult]), StagesModule],
  providers: [RoundResultsService, RoundResultsResolver],
  exports: [RoundResultsService],
})
export class RoundResultsModule {}
