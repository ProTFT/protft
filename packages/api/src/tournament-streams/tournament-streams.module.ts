import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TournamentStream } from "./tournament-stream.entity";
import { TournamentStreamsResolver } from "./tournament-streams.resolver";
import { TournamentStreamsService } from "./tournament-streams.service";

@Module({
  imports: [TypeOrmModule.forFeature([TournamentStream])],
  providers: [TournamentStreamsService, TournamentStreamsResolver],
  exports: [],
  controllers: [],
})
export class TournamentStreamsModule {}
