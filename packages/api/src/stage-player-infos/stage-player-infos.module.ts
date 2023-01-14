import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StagePlayerInfo } from "./stage-player-info.entity";
import { StagePlayerInfosService } from "./stage-player-infos.service";

@Module({
  imports: [TypeOrmModule.forFeature([StagePlayerInfo])],
  providers: [StagePlayerInfosService],
  exports: [StagePlayerInfosService],
})
export class StagePlayerInfosModule {}
