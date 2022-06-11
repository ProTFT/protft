import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Points, PointSchema } from "./point.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Points, PointSchema])],
  providers: [],
  exports: [],
})
export class PointsModule {}
