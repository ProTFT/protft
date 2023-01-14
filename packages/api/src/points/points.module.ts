import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Points, PointSchema } from "./point.entity";
import { PointSchemasResolver } from "./points.resolver";
import { PointSchemasService } from "./points.service";

@Module({
  imports: [TypeOrmModule.forFeature([Points, PointSchema])],
  providers: [PointSchemasService, PointSchemasResolver],
  exports: [PointSchemasService],
})
export class PointsModule {}
