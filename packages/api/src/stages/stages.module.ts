import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LobbiesModule } from "../lobbies/lobbies.module";
import { RoundsModule } from "../rounds/rounds.module";
import { Stage } from "./stage.entity";
import { StagesResolver } from "./stages.resolver";
import { StagesService } from "./stages.service";

@Module({
  imports: [TypeOrmModule.forFeature([Stage]), LobbiesModule, RoundsModule],
  providers: [StagesService, StagesResolver],
  exports: [StagesService],
})
export class StagesModule {}
