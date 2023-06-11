import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayerLink } from "./player-link.entity";
import { PlayerLinksService } from "./player-links.service";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerLink])],
  providers: [PlayerLinksService],
  exports: [PlayerLinksService],
  controllers: [],
})
export class PlayerLinksModule {}
