import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";

export const StyledLobbyGroupContainer = styled(StyledVerticalContainer)`
  gap: 2rem;
`;

export const StyledBar = styled(StyledHorizontalContainer)`
  justify-content: center;
  gap: 2rem;
`;

export const StyledButtonContainer = styled(StyledHorizontalContainer)`
  gap: 1rem;
`;

export const StyledLobbyContainer = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "1rem",
  rowGap: "1rem",
}));

export const StyledTitleContainer = styled(StyledHorizontalContainer)`
  align-items: center;
  gap: 1rem;
`;
