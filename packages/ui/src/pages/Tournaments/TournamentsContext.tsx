import { createContext, useCallback, useContext, useState } from "react";

interface TournamentsContext {
  filters: TournamentFilters;
  setFilters: React.Dispatch<React.SetStateAction<TournamentFilters>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loadMore: () => void;
  resetPagination: () => void;
}

export interface TournamentFilters {
  region: string[];
  setId: number[];
}

const tournamentsContext = createContext<TournamentsContext>(
  {} as TournamentsContext
);

export function TournamentsProvider({ children }: React.PropsWithChildren<{}>) {
  const tournaments = useProvideTournaments();
  return (
    <tournamentsContext.Provider value={tournaments}>
      {children}
    </tournamentsContext.Provider>
  );
}

export const useTournamentsContext = () => {
  return useContext(tournamentsContext);
};

export const useProvideTournaments = (): TournamentsContext => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<TournamentFilters>({
    region: [],
    setId: [],
  });

  const loadMore = useCallback(() => {
    setPage((curr) => curr + 1);
  }, []);

  const resetPagination = useCallback(() => {
    setPage(0);
  }, []);

  return {
    filters,
    setFilters,
    page,
    setPage,
    loadMore,
    resetPagination,
  };
};
