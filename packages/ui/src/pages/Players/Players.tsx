import { Suspense, useCallback, useState } from "react";
import { Helmet } from "react-helmet";
import { SearchField } from "../../components/SearchFilterBar/SearchField";
import { usePagination } from "../../hooks/usePagination";
import { StyledContainer } from "./Players.styled";
import { usePlayersContext } from "./PlayersContext";
import { PlayersList } from "./PlayersList/PlayersList";
import { PlayersListSkeleton } from "./PlayersList/PlayersList.skeleton";

const ITEMS_PER_PAGE = 20;

export const Players = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { resetPagination, loadMore, page } = usePlayersContext();
  const { paginationArgs } = usePagination(page, ITEMS_PER_PAGE);

  const onSetSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query);
      resetPagination();
    },
    [resetPagination]
  );

  return (
    <StyledContainer>
      <Helmet>
        <title>Players</title>
      </Helmet>
      <SearchField
        placeholder="Search players"
        setSearchQuery={onSetSearchQuery}
      />
      <Suspense fallback={<PlayersListSkeleton />}>
        <PlayersList
          searchQuery={searchQuery}
          pagination={paginationArgs}
          onLoadMore={loadMore}
        />
      </Suspense>
    </StyledContainer>
  );
};
