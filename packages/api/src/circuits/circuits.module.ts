import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SetsModule } from "../sets/sets.module";
import { Circuit } from "./circuit.entity";
import { CircuitsResolver } from "./circuits.resolver";
import { CircuitsService } from "./circuits.service";

@Module({
  imports: [TypeOrmModule.forFeature([Circuit]), SetsModule],
  providers: [CircuitsService, CircuitsResolver],
  exports: [],
})
export class CircuitsModule {}
