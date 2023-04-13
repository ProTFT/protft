import { useDeferredValue, useMemo } from "react";

export interface Pagination {
  skip: number;
  take: number;
}

export const usePagination = (page: number, itemsPerPage: number) => {
  const paginationArgs = useMemo(
    () => ({
      skip: page * itemsPerPage,
      take: itemsPerPage,
    }),
    [itemsPerPage, page]
  );

  const deferredPagination = useDeferredValue(paginationArgs);

  return { paginationArgs: deferredPagination };
};
