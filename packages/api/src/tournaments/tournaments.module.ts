import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SetsModule } from "../sets/sets.module";
import { StagesModule } from "../stages/stages.module";
import { Tournament } from "./entities/tournament.entity";
import { TournamentsReadService } from "./services/tournaments-read.service";
import { TournamentsResolver } from "./tournaments.resolver";
import { TournamentsWriteService } from "./services/tournaments-write.service";
import { TournamentsFieldsService } from "./services/tournaments-fields.service";
import { TournamentsExternalController } from "./tournaments-external.controller";
import { TournamentsExternalService } from "./services/tournaments-external.service";

@Module({
  imports: [TypeOrmModule.forFeature([Tournament]), SetsModule, StagesModule],
  providers: [
    TournamentsWriteService,
    TournamentsExternalService,
    TournamentsResolver,
    TournamentsReadService,
    TournamentsFieldsService,
  ],
  controllers: [TournamentsExternalController],
  exports: [TournamentsWriteService],
})
export class TournamentsModule {}
