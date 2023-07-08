import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SetsModule } from "../sets/sets.module";
import { StagesModule } from "../stages/stages.module";
import { Tournament } from "./tournament.entity";
import { TournamentsReadService } from "./services/tournaments-read.service";
import { TournamentsResolver } from "./tournaments.resolver";
import { TournamentsService } from "./tournaments.service";
import { TournamentsFieldsService } from "./services/tournaments-fields.service";
import { TournamentsController } from "./tournaments.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Tournament]), SetsModule, StagesModule],
  providers: [
    TournamentsService,
    TournamentsResolver,
    TournamentsReadService,
    TournamentsFieldsService,
  ],
  controllers: [TournamentsController],
  exports: [TournamentsService],
})
export class TournamentsModule {}
