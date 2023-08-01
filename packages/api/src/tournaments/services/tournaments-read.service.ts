import { Injectable } from "@nestjs/common";
import { Raw, Repository } from "typeorm";
import {
  afterOrToday,
  afterToday,
  beforeOrToday,
  beforeToday,
} from "../../lib/DBRawFilter";
import { PaginationArgs } from "../../lib/dto/pagination.args";
import { TournamentRepository } from "../tournament.repository";
import { InjectRepository } from "@nestjs/typeorm";
import {
  BaseGetTournamentArgs,
  GetTournamentsArgs,
} from "../gql/get-tournaments.args";
import { Tournament } from "../entities/tournament.entity";
import { GetTournamentWithStatsArgs } from "../gql/get-tournaments-with-stats.args";

@Injectable()
export class TournamentsReadService {
  private customRepository: TournamentRepository;
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {
    this.customRepository = new TournamentRepository(this.tournamentRepository);
  }

  findAll(
    tournamentArgs?: GetTournamentsArgs,
    paginationArgs?: PaginationArgs,
    onlyVisible = true,
  ): Promise<Tournament[]> {
    return this.customRepository.findWithPagination(
      tournamentArgs,
      paginationArgs,
      {
        sorting: { startDate: "DESC" },
        onlyVisible: onlyVisible,
      },
    );
  }

  findOne(id: number, relations?: string[]): Promise<Tournament> {
    return this.tournamentRepository.findOne(id, { relations });
  }

  findOneBySlug(slug: string): Promise<Tournament> {
    return this.tournamentRepository.findOne({ slug });
  }

  async findWithStats({
    searchQuery,
    setIds,
  }: GetTournamentWithStatsArgs): Promise<Tournament[]> {
    const [past, current] = await Promise.all([
      this.findPast({ searchQuery, setId: setIds }),
      this.findOngoing({ searchQuery, setIds }),
    ]);
    return [...current, ...past];
  }

  findPast(
    tournamentArgs?: BaseGetTournamentArgs,
    paginationArgs?: PaginationArgs,
  ): Promise<Tournament[]> {
    return this.customRepository.findWithPagination(
      tournamentArgs,
      paginationArgs,
      {
        condition: { endDate: Raw(beforeToday) },
        sorting: { endDate: "DESC" },
      },
    );
  }

  findOngoing({
    searchQuery,
    setIds,
  }: GetTournamentWithStatsArgs): Promise<Tournament[]> {
    return this.customRepository.findWithPagination(
      { searchQuery, setId: setIds },
      { skip: 0, take: 100 },
      {
        condition: {
          startDate: Raw(beforeOrToday),
          endDate: Raw(afterOrToday),
        },
        sorting: { startDate: "DESC" },
      },
    );
  }

  findUpcoming(
    tournamentArgs?: BaseGetTournamentArgs,
    paginationArgs?: PaginationArgs,
  ): Promise<Tournament[]> {
    return this.customRepository.findWithPagination(
      tournamentArgs,
      paginationArgs,
      {
        condition: { startDate: Raw(afterToday) },
        sorting: { startDate: "ASC" },
      },
    );
  }
}
