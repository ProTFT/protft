import { useCallback } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  StyledContainer,
  StyledTabButton,
  StyledTabContainer,
} from "./Content.styled";
import { TournamentPlayers } from "./TournamentPlayers/TournamentPlayers";
import { TournamentStages } from "./TournamentStages/TournamentStages";

export const AdminTournamentContent = () => {
  const location = useLocation();
  const isTabSelected = useCallback(
    (path: string) => location.pathname.includes(path),
    [location.pathname]
  );
  return (
    <StyledContainer>
      <StyledTabContainer>
        <Link to="players">
          <StyledTabButton selected={isTabSelected("players")}>
            Players
          </StyledTabButton>
        </Link>
        <Link to="stages">
          <StyledTabButton selected={isTabSelected("stages")}>
            Stages
          </StyledTabButton>
        </Link>
      </StyledTabContainer>
      <Routes>
        <Route index element={<TournamentPlayers />} />
        <Route path={`players`} element={<TournamentPlayers />} />
        <Route path={`stages`} element={<TournamentStages />} />
      </Routes>
    </StyledContainer>
  );
};
