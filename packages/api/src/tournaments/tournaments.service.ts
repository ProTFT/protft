import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeepTournamentInput } from "./dto/create-deep-tournament.args";
import { CreateTournamentArgs } from "./dto/create-tournament.args";
import { Tournament } from "./tournament.entity";

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

  createOne(payload: CreateTournamentArgs): Promise<Tournament> {
    return this.tournamentRepository.save(payload);
  }

  createDeepOne(tournament: DeepTournamentInput): Promise<Tournament> {
    return this.tournamentRepository.save(tournament);
  }
}
