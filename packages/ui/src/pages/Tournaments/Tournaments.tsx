import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { StyledContainer } from "./Tournaments.styled";
import { StyledSearchFilterBar } from "../../components/SearchFilterBar/SearchFilterBar";
import { Suspense, useState } from "react";
import { TournamentList } from "./TournamentList/TournamentList";
import { TournamentListSkeleton } from "./TournamentList/TournamentList.skeleton";

export const Tournaments = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useDocumentTitle("Tourneys");

  return (
    <StyledContainer>
      <StyledSearchFilterBar
        placeholder="Search events"
        setSearchQuery={setSearchQuery}
      />
      <Suspense fallback={<TournamentListSkeleton />}>
        <TournamentList searchQuery={searchQuery} />
      </Suspense>
    </StyledContainer>
  );
};
