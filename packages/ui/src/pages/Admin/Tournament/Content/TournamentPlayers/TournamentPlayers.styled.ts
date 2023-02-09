import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../../../design/colors";

export const StyledContainer = styled(StyledHorizontalContainer)`
  padding: 6rem;
  gap: 2rem;
  justify-content: space-between;
`;

export const StyledTournamentPlayerListSmaller = styled(
  StyledVerticalContainer
)`
  border: 0.2rem solid ${colors.yellow};
  border-radius: 0.2rem;
  padding: 2rem;
  height: 100%;
  width: 100%;
`;

export const StyledBar = styled(StyledHorizontalContainer)`
  justify-content: space-between;
`;

export const StyledButton = styled.button`
  cursor: pointer;
`;
