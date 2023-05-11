import { createContext, useCallback, useContext, useState } from "react";

interface PlayersContext {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loadMore: () => void;
  resetPagination: () => void;
}

const playersContext = createContext<PlayersContext>({} as PlayersContext);

export function PlayersProvider({ children }: React.PropsWithChildren<{}>) {
  const players = useProvidePlayers();
  return (
    <playersContext.Provider value={players}>
      {children}
    </playersContext.Provider>
  );
}

export const usePlayersContext = () => {
  return useContext(playersContext);
};

export const useProvidePlayers = (): PlayersContext => {
  const [page, setPage] = useState(0);

  const loadMore = useCallback(() => {
    setPage((curr) => curr + 1);
  }, []);

  const resetPagination = useCallback(() => {
    setPage(0);
  }, []);

  return {
    page,
    setPage,
    loadMore,
    resetPagination,
  };
};
