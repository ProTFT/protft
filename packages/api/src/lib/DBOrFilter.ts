import { SelectQueryBuilder } from "typeorm";

export const createOrWhereConditions =
  (whereConditions: string[]) => (qb: SelectQueryBuilder<unknown>) =>
    whereConditions.forEach((condition) => qb.orWhere(condition));
