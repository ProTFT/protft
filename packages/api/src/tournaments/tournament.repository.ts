import { FindCondition, In, Raw, Repository } from "typeorm";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";
import { afterDay, beforeOrDay, includes } from "../lib/DBRawFilter";
import { PaginationArgs } from "../lib/dto/pagination.args";
import { getSearchQueryFilter } from "../lib/SearchQuery";
import { BaseGetTournamentArgs } from "./dto/get-tournaments.args";
import { Tournament } from "./tournament.entity";

interface FindParameters {
  onlyVisible?: boolean;
  condition?: FindCondition<Tournament>;
  sorting?: {
    [P in EntityFieldsNames<Tournament>]?: "ASC" | "DESC" | 1 | -1;
  };
}

export const TOURNAMENT_PAGE_SIZE = 20;
export const TOURNAMENT_INITIAL_PAGE = 0;

export class TournamentRepository {
  constructor(private repository: Repository<Tournament>) {}

  public findWithPagination(
    tournamentArgs: BaseGetTournamentArgs = {},
    paginationArgs: PaginationArgs = {},
    findParameters: FindParameters = {},
  ) {
    const { searchQuery, ...filters } = tournamentArgs;
    const { onlyVisible = true, condition, sorting } = findParameters;
    const { take = TOURNAMENT_PAGE_SIZE, skip = TOURNAMENT_INITIAL_PAGE } =
      paginationArgs;
    const searchQueryFilter = getSearchQueryFilter(searchQuery);
    const visibilityFilter = onlyVisible ? { visibility: true } : {};
    const regionFilter = filters.region && {
      region: Raw(includes(filters.region)),
    };
    const setFilter = filters.setId && { setId: In(filters.setId) };
    const startDateFilter = filters.startDate && {
      startDate: Raw(afterDay(filters.startDate)),
    };
    const endDateFilter = filters.endDate && {
      endDate: Raw(beforeOrDay(filters.endDate)),
    };
    return this.repository.find({
      where: {
        ...searchQueryFilter,
        ...visibilityFilter,
        ...regionFilter,
        ...setFilter,
        ...condition,
        ...startDateFilter,
        ...endDateFilter,
      },
      take,
      skip,
      order: sorting,
    });
  }
}
