import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";

export const StyledLobbyGroupContainer = styled(StyledVerticalContainer)`
  gap: 2rem;
`;

export const StyledBar = styled(StyledVerticalContainer)`
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const StyledButtonContainer = styled(StyledHorizontalContainer)`
  gap: 1rem;
  flex-wrap: wrap;
`;

export const StyledLobbyContainer = styled(StyledHorizontalContainer)`
  flex-wrap: wrap;
  gap: 2rem;
`;

export const StyledTitleContainer = styled(StyledHorizontalContainer)`
  align-items: center;
  gap: 1rem;
`;
