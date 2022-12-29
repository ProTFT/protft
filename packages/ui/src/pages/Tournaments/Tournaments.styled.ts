import styled from "styled-components";
import { StyledHorizontalContainer } from "../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledContainer = styled(StyledVerticalContainer)`
  text-align: center;
  padding: 1rem;
  background-color: ${colors.blackBackground};
  gap: 1rem;

  @media ${device.tablet} {
    padding: 2rem 4rem 1rem 4rem;
  }
`;

export const StyledSetFilterContainer = styled(StyledHorizontalContainer)`
  gap: 0.5rem;
  flex: 2;
`;

export const StyledTournamentList = styled(StyledVerticalContainer)`
  gap: 2rem;

  @media ${device.tablet} {
    padding: 2rem;
  }
`;
