import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TournamentStream } from "./tournament-stream.entity";

@Injectable()
export class TournamentStreamsService {
  constructor(
    @InjectRepository(TournamentStream)
    private tournamentStreamRepository: Repository<TournamentStream>,
  ) {}

  public findStreamsByTournament(tournamentId: number) {
    return this.tournamentStreamRepository.find({
      where: { tournamentId },
    });
  }

  public addStream(stream: TournamentStream) {
    return this.tournamentStreamRepository.save(stream);
  }

  public async deleteStream(tournamentId: number, name: string) {
    await this.tournamentStreamRepository.softDelete({
      tournamentId,
      name,
    });
    return { id: tournamentId };
  }
}
