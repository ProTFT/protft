import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../../../design/colors";

export const StyledContainer = styled(StyledHorizontalContainer)`
  padding: 6rem 2rem 2rem 2rem;
  gap: 5rem;
  align-items: flex-start;
`;

export const StyledBar = styled(StyledHorizontalContainer)`
  justify-content: start;
`;

export const StyledTournamentPlayersSection = styled(StyledVerticalContainer)``;

export const StyledTournamentPlayerList = styled(StyledVerticalContainer)`
  border: 0.2rem solid ${colors.yellow};
  border-radius: 0.2rem;
  padding: 2rem;
  height: 100%;
  width: 100%;
  min-height: 20rem;
`;

export const StyledButton = styled.button`
  cursor: pointer;
`;

export const StyledLobbyContainer = styled(StyledHorizontalContainer)`
  flex-wrap: wrap;
  gap: 2rem;
`;
