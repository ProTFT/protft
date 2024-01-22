import { QueryBuilder, Repository } from "typeorm";
import { PaginationArgs } from "../lib/dto/pagination.args";
import { BaseGetPlayerArgs } from "./dto/get-players.args";
import { Player } from "./player.entity";

export const PLAYERS_PAGE_SIZE = 10;
export const PLAYERS_INITIAL_PAGE = 0;

export class PlayerRepository {
  constructor(private repository: Repository<Player>) {}

  public findWithPagination(
    { searchQuery, ...filters }: BaseGetPlayerArgs = {},
    { take = PLAYERS_PAGE_SIZE, skip = PLAYERS_INITIAL_PAGE }: PaginationArgs,
  ) {
    let query = this.repository
      .createQueryBuilder()
      .leftJoin(
        (qb: QueryBuilder<Player>) => {
          qb.getQuery = () => `LATERAL unnest(\"Player\".alias)`;
          qb.setParameters({});
          return qb;
        },
        "formatted_alias",
        "true",
      )
      .take(take)
      .skip(skip);

    if (searchQuery) {
      query = query.andWhere(
        `(name ILIKE '%${searchQuery}%' OR formatted_alias ILIKE '%${searchQuery}%')`,
      );
    }

    if (filters.country) {
      query = query.andWhere({ country: filters.country });
    }

    if (filters.region) {
      query = query.andWhere({ region: filters.region });
    }

    return query.getMany();
  }

  public findOneByNameOrAlias(name: string, region: string) {
    return this.repository
      .createQueryBuilder()
      .leftJoin(
        (qb: QueryBuilder<Player>) => {
          qb.getQuery = () => `LATERAL unnest(\"Player\".alias)`;
          qb.setParameters({});
          return qb;
        },
        "formatted_alias",
        "true",
      )
      .andWhere(`(name ILIKE '${name}' OR formatted_alias ILIKE '${name}')`)
      .andWhere({ region })
      .getOne();
  }
}
