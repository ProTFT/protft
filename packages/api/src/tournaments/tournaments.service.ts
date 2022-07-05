import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tournament } from "./tournament.entity";

type CreateTournamentPayload = Partial<Omit<Tournament, "id">>;

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  findAll(): Promise<Tournament[]> {
    return this.tournamentRepository.find();
  }

  findOne(id: number): Promise<Tournament> {
    return this.tournamentRepository.findOne(id);
  }

  createOne(payload: CreateTournamentPayload): Promise<Tournament> {
    return this.tournamentRepository.save(payload);
  }
}
