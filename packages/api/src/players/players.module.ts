import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoundResultsModule } from "../round-results/round-results.module";
import { Player } from "./player.entity";
import { PlayersController } from "./players.controller";
import { PlayersResolver } from "./players.resolver";
import { PlayersService } from "./players.service";

@Module({
  imports: [TypeOrmModule.forFeature([Player]), RoundResultsModule],
  providers: [PlayersService, PlayersResolver],
  exports: [PlayersService],
  controllers: [PlayersController],
})
export class PlayersModule {}
