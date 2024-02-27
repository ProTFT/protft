import { useCallback } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { SuspenseElement } from "../../../../components/SuspendedPage";
import {
  StyledContainer,
  StyledTabButton,
  StyledTabContainer,
} from "./Content.styled";
import { PlayerLinks } from "./Links/PlayerLinks";

enum ContentPath {
  LINKS = "links",
}

export const AdminPlayerContent = () => {
  const location = useLocation();

  const isTabSelected = useCallback(
    (path: string) => location.pathname.includes(path),
    [location.pathname]
  );

  return (
    <StyledContainer>
      <StyledTabContainer>
        <Link to="links">
          <StyledTabButton selected={isTabSelected(ContentPath.LINKS)}>
            Links
          </StyledTabButton>
        </Link>
      </StyledTabContainer>
      <Routes>
        <Route
          path={ContentPath.LINKS}
          element={<SuspenseElement element={<PlayerLinks />} />}
        />
      </Routes>
    </StyledContainer>
  );
};
