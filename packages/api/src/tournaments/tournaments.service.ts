import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
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
    return this.tournamentRepository.find({ order: { startDate: "DESC" } });
  }

  findOne(id: number): Promise<Tournament> {
    return this.tournamentRepository.findOne(id);
  }

  findPast(): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      where: { endDate: Raw((alias) => `${alias} < CURRENT_DATE`) },
      take: 10,
      order: { startDate: "DESC" },
    });
  }

  findLive(): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      where: {
        startDate: Raw((alias) => `${alias} <= CURRENT_DATE`),
        endDate: Raw((alias) => `${alias} >= CURRENT_DATE`),
      },
      order: { startDate: "DESC" },
    });
  }

  findUpcoming(): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      where: {
        startDate: Raw((alias) => `${alias} > CURRENT_DATE`),
      },
      take: 10,
      order: { startDate: "ASC" },
    });
  }

  createOne(payload: CreateTournamentArgs): Promise<Tournament> {
    return this.tournamentRepository.save(payload);
  }

  createDeepOne(tournament: DeepTournamentInput): Promise<Tournament> {
    return this.tournamentRepository.save(tournament);
  }
}
