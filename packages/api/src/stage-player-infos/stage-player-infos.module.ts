import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StagePlayerInfo } from "./stage-player-info.entity";
import { StagePlayerInfosController } from "./stage-player-infos.controller";
import { StagePlayerInfosService } from "./stage-player-infos.service";

@Module({
  imports: [TypeOrmModule.forFeature([StagePlayerInfo])],
  providers: [StagePlayerInfosService],
  exports: [StagePlayerInfosService],
  controllers: [StagePlayerInfosController],
})
export class StagePlayerInfosModule {}
