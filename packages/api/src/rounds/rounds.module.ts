import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Round } from "./round.entity";
import { RoundsService } from "./rounds.service";

@Module({
  imports: [TypeOrmModule.forFeature([Round])],
  providers: [RoundsService],
  exports: [RoundsService],
})
export class RoundsModule {}
