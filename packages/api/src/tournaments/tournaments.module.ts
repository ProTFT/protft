import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SearchQuery } from "../lib/SearchQuery";
import { SetsModule } from "../sets/sets.module";
import { StagesModule } from "../stages/stages.module";
import { Tournament } from "./tournament.entity";
import { TournamentsResolver } from "./tournaments.resolver";
import { TournamentsService } from "./tournaments.service";

@Module({
  imports: [TypeOrmModule.forFeature([Tournament]), SetsModule, StagesModule],
  providers: [TournamentsService, TournamentsResolver, SearchQuery],
})
export class TournamentsModule {}
