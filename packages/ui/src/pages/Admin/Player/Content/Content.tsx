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
import { TournamentStreams } from "./TournamentStreams/TournamentStreams";

enum ContentPath {
  PLAYERS = "players",
  STAGES = "stages",
  STREAMS = "streams",
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
        <Link to="streams">
          <StyledTabButton selected={isTabSelected(ContentPath.STREAMS)}>
            Streams
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
        <Route
          path={ContentPath.STREAMS}
          element={<SuspenseElement element={<TournamentStreams />} />}
        />
      </Routes>
    </StyledContainer>
  );
};
