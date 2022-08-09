import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoundResult } from "./round-result.entity";
import { RoundResultsService } from "./round-results.service";

@Module({
  imports: [TypeOrmModule.forFeature([RoundResult])],
  providers: [RoundResultsService],
  exports: [RoundResultsService],
})
export class RoundResultsModule {}
