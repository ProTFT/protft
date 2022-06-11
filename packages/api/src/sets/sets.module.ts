import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Set } from "./set.entity";
import { SetsResolver } from "./sets.resolver";
import { SetsService } from "./sets.service";

@Module({
  imports: [TypeOrmModule.forFeature([Set])],
  providers: [SetsService, SetsResolver],
  controllers: [],
  exports: [SetsService],
})
export class SetsModule {}
