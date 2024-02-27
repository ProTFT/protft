import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LobbiesModule } from "../lobbies/lobbies.module";
import { PointsModule } from "../points/points.module";
import { QualificationModule } from "../qualification/qualification.module";
import { RoundsModule } from "../rounds/rounds.module";
import { StagePlayerInfosModule } from "../stage-player-infos/stage-player-infos.module";
import { StageFormatService } from "./stage-format.service";
import { Stage } from "./stage.entity";
import { StagesExternalController } from "./stages-external.controller";
import { StagesResolver } from "./stages.resolver";
import { StagesService } from "./stages.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Stage]),
    LobbiesModule,
    RoundsModule,
    PointsModule,
    StagePlayerInfosModule,
    QualificationModule,
  ],
  providers: [StagesService, StagesResolver, StageFormatService],
  controllers: [StagesExternalController],
  exports: [StagesService],
})
export class StagesModule {}
