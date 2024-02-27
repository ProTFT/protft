import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";

export const StyledLobbyGroupContainer = styled(StyledVerticalContainer)`
  gap: 2rem;
`;

export const StyledBar = styled(StyledVerticalContainer)`
  gap: 2rem;
`;

export const StyledButtonContainer = styled.div`
  display: grid;
  column-gap: 1rem;
  row-gap: 0.5rem;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const StyledLobbyContainer = styled(StyledHorizontalContainer)`
  flex-wrap: wrap;
  gap: 2rem;
`;

export const StyledTitleContainer = styled(StyledHorizontalContainer)`
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
