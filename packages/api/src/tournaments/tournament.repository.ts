import { FindCondition, In, Raw, Repository } from "typeorm";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";
import { JwtUser } from "../auth/jwt.strategy";
import { includes, includesInt } from "../lib/DBRawFilter";
import { PaginationArgs } from "../lib/dto/pagination.args";
import { getSearchQueryFilter } from "../lib/SearchQuery";
import { Roles } from "../users/user.entity";
import { Tournament } from "./entities/tournament.entity";
import { BaseGetTournamentArgs } from "./gql/get-tournaments.args";

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
    const permissionFilter = this.getPermissionFilter(filters.user);
    const setFilter = filters.setId?.length && { setId: In(filters.setId) };
    return this.repository.find({
      where: {
        ...searchQueryFilter,
        ...visibilityFilter,
        ...regionFilter,
        ...setFilter,
        ...condition,
        ...permissionFilter,
      },
      take,
      skip,
      order: sorting,
    });
  }

  private getPermissionFilter = (user?: JwtUser) => {
    if (!user || user.roles.includes(Roles.WEBMASTER)) {
      return {};
    }
    return {
      editPermission: Raw(includesInt([user.userId])),
    };
  };
}
