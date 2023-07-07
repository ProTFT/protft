import { Injectable } from "@nestjs/common";
import { Raw, Repository } from "typeorm";
import { Tournament } from "../tournament.entity";
import {
  afterDay,
  afterOrToday,
  afterToday,
  beforeOrDay,
  beforeOrToday,
  beforeToday,
  includes,
} from "../../lib/DBRawFilter";
import { PaginationArgs } from "../../lib/dto/pagination.args";
import {
  BaseGetTournamentArgs,
  GetTournamentsArgs,
} from "../dto/get-tournaments.args";
import { TournamentRepository } from "../tournament.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { GetTournamentsByMonthArgs } from "../dto/get-tournaments-by-month.args";

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

  findByMonth(
    month: number,
    year: number,
    filters: Pick<GetTournamentsByMonthArgs, "region">,
  ): Promise<Tournament[]> {
    const dateFormatter = Intl.DateTimeFormat("en");
    const firstDayOfMonth = dateFormatter.format(
      new Date(year, month, 1, 0, 0, 0, 0),
    );
    const lastDayOfMonth = dateFormatter.format(
      new Date(year, month + 1, 0, 0, 0, 0, 0),
    );

    return this.tournamentRepository.find({
      // region: Raw(includes(filters.region)),
      startDate: Raw(afterDay(firstDayOfMonth)),
      endDate: Raw(beforeOrDay(lastDayOfMonth)),
    });
  }

  async findWithStats(searchQuery?: string): Promise<Tournament[]> {
    const [past, current] = await Promise.all([
      this.findPast({ searchQuery }),
      this.findOngoing(searchQuery),
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

  findOngoing(searchQuery?: string): Promise<Tournament[]> {
    return this.customRepository.findWithPagination(
      { searchQuery },
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
