import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { SearchQuery } from "../lib/SearchQuery";
import { DeepTournamentInput } from "./dto/create-deep-tournament.args";
import { CreateTournamentArgs } from "./dto/create-tournament.args";
import { UpdateTournamentArgs } from "./dto/update-tournament.args";
import { Tournament } from "./tournament.entity";

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    private searchQueryProvider: SearchQuery,
  ) {}

  findAll(searchQuery?: string): Promise<Tournament[]> {
    const searchQueryFilter =
      this.searchQueryProvider.getSearchQueryFilter(searchQuery);
    return this.tournamentRepository.find({
      where: { ...searchQueryFilter },
      order: { startDate: "DESC" },
    });
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

  async updateOne({ id, ...rest }: UpdateTournamentArgs): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne(id);
    if (!tournament) {
      throw new NotFoundException();
    }
    await this.tournamentRepository.update({ id }, rest);
    return this.tournamentRepository.findOne(id);
  }

  createDeepOne(tournament: DeepTournamentInput): Promise<Tournament> {
    return this.tournamentRepository.save(tournament);
  }

  async deleteOne(id: number): Promise<DeleteResponse> {
    await this.tournamentRepository.delete({ id });
    return new DeleteResponse(id);
  }
}
