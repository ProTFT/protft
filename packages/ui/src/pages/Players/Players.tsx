import { useState } from "react";
import { StyledSearchFilterBar } from "../../components/SearchFilterBar/SearchFilterBar";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { StyledContainer } from "../Tournaments/Tournaments.styled";
import { PlayersList } from "./PlayersList/PlayersList";

export const Players = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useDocumentTitle("Players");

  return (
    <StyledContainer>
      <StyledSearchFilterBar
        placeholder="Search players"
        setSearchQuery={setSearchQuery}
      />
      <PlayersList searchQuery={searchQuery} />
    </StyledContainer>
  );
};
