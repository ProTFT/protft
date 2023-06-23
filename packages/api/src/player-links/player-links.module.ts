import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayerLink } from "./player-link.entity";
import { PlayerLinksResolver } from "./player-links.resolver";
import { PlayerLinksService } from "./player-links.service";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerLink])],
  providers: [PlayerLinksService, PlayerLinksResolver],
  exports: [PlayerLinksService],
  controllers: [],
})
export class PlayerLinksModule {}
