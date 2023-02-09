import { useCallback } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { SuspenseElement } from "../../../../components/SuspendedPage";
import {
  StyledContainer,
  StyledTabButton,
  StyledTabContainer,
} from "./Content.styled";
import { TournamentPlayers } from "./TournamentPlayers/TournamentPlayers";
import { TournamentStages } from "./TournamentStages/TournamentStages";

enum ContentPath {
  PLAYERS = "players",
  STAGES = "stages",
}

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
          <StyledTabButton selected={isTabSelected(ContentPath.PLAYERS)}>
            Players
          </StyledTabButton>
        </Link>
        <Link to="stages">
          <StyledTabButton selected={isTabSelected(ContentPath.STAGES)}>
            Stages
          </StyledTabButton>
        </Link>
      </StyledTabContainer>
      <Routes>
        <Route
          path={ContentPath.PLAYERS}
          element={<SuspenseElement element={<TournamentPlayers />} />}
        />
        <Route
          path={ContentPath.STAGES}
          element={<SuspenseElement element={<TournamentStages />} />}
        />
      </Routes>
    </StyledContainer>
  );
};
