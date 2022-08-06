import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MutationPayload } from "../lib/types";
import { Tournament, TournamentInput } from "./tournament.entity";

type CreateTournamentPayload = MutationPayload<Tournament, "name" | "setId">;

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

  async createDeepOne(tournament: TournamentInput): Promise<Tournament> {
    const saved = await this.tournamentRepository.save(tournament);
    console.log(saved.stages[0].lobbies[0].rounds);
    return saved;
  }
}
