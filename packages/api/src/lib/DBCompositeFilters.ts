import { ILike, SelectQueryBuilder } from "typeorm";
import { Player } from "../players/player.entity";

export const createOrWhereConditions =
  (whereConditions: string[]) => (qb: SelectQueryBuilder<unknown>) =>
    whereConditions.forEach((condition) => qb.orWhere(condition));

export const likeNameOrAlias =
  (query: string) => (qb: SelectQueryBuilder<Player>) =>
    qb.orWhere({ name: ILike(query) }).orWhere({ alias: ILike(query) });
