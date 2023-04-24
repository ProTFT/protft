import { Suspense, useCallback, useState } from "react";
import { Helmet } from "react-helmet";
import { SearchField } from "../../components/SearchFilterBar/SearchField";
import { usePagination } from "../../hooks/usePagination";
import { StyledContainer } from "./Players.styled";
import { PlayersList } from "./PlayersList/PlayersList";
import { PlayersListSkeleton } from "./PlayersList/PlayersList.skeleton";

const ITEMS_PER_PAGE = 20;

export const Players = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const { paginationArgs } = usePagination(page, ITEMS_PER_PAGE);

  const onLoadMore = useCallback(() => {
    setPage((curr) => curr + 1);
  }, []);

  return (
    <StyledContainer>
      <Helmet>
        <title>Players</title>
      </Helmet>
      <SearchField
        placeholder="Search players"
        setSearchQuery={setSearchQuery}
      />
      <Suspense fallback={<PlayersListSkeleton />}>
        <PlayersList
          searchQuery={searchQuery}
          pagination={paginationArgs}
          onLoadMore={onLoadMore}
        />
      </Suspense>
    </StyledContainer>
  );
};
