import { Suspense, useState } from "react";
import { StyledSearchFilterBar } from "../../components/SearchFilterBar/SearchFilterBar";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { StyledContainer } from "./Players.styled";
import { PlayersList } from "./PlayersList/PlayersList";
import { PlayersListSkeleton } from "./PlayersList/PlayersList.skeleton";

export const Players = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useDocumentTitle("Players");

  return (
    <StyledContainer>
      <StyledSearchFilterBar
        placeholder="Search players"
        setSearchQuery={setSearchQuery}
      />
      <Suspense fallback={<PlayersListSkeleton />}>
        <PlayersList searchQuery={searchQuery} />
      </Suspense>
    </StyledContainer>
  );
};
