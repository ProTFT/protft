import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LobbiesModule } from "../lobbies/lobbies.module";
import { PointsModule } from "../points/points.module";
import { RoundsModule } from "../rounds/rounds.module";
import { StagePlayerInfosModule } from "../stage-player-infos/stage-player-infos.module";
import { Stage } from "./stage.entity";
import { StagesController } from "./stages.controller";
import { StagesResolver } from "./stages.resolver";
import { StagesService } from "./stages.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Stage]),
    LobbiesModule,
    RoundsModule,
    PointsModule,
    StagePlayerInfosModule,
  ],
  providers: [StagesService, StagesResolver],
  controllers: [StagesController],
  exports: [StagesService],
})
export class StagesModule {}
