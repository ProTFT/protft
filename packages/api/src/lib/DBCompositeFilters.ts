import { ILike, SelectQueryBuilder } from "typeorm";
import { Player } from "../players/player.entity";
import { includes } from "./DBRawFilter";

export const createOrWhereConditions =
  (whereConditions: string[]) => (qb: SelectQueryBuilder<unknown>) =>
    whereConditions.forEach((condition) => qb.orWhere(condition));

export const likeNameOrAlias =
  (query: string) => (qb: SelectQueryBuilder<Player>) =>
    qb.orWhere({ name: ILike(query) }).orWhere(includes([query])("alias"));
// should get lower here
