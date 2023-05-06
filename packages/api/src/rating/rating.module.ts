import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TournamentsModule } from "../tournaments/tournaments.module";
import { RatingController } from "./rating.controller";
import { PlayerRating, Rating } from "./rating.entity";
import { RatingService } from "./rating.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating, PlayerRating]),
    TournamentsModule,
  ],
  providers: [RatingService],
  exports: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
