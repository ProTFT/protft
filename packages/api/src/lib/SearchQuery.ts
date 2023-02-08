import { ILike } from "typeorm";

export const getSearchQueryFilter = (searchQuery?: string) => {
  return searchQuery
    ? {
        name: ILike(`%${searchQuery.toLowerCase()}%`),
      }
    : {};
};
