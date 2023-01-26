import styled from "styled-components";
import { StyledHorizontalContainer } from "../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledContainer = styled(StyledVerticalContainer)`
  text-align: center;
  padding: 1rem;
  background-color: ${colors.blackBackground};
  gap: 2rem;

  @media ${device.desktop} {
    padding: 2rem 4rem 1rem 4rem;
  }
`;

export const StyledSetFilterContainer = styled(StyledHorizontalContainer)`
  gap: 0.5rem;
  flex: 2;
`;

export const StyledTournamentList = styled(StyledVerticalContainer)`
  gap: 1rem;

  @media ${device.tablet} {
    padding: 2rem;
  }
`;

export const StyledBar = styled(StyledVerticalContainer)`
  gap: 2rem;
  align-items: center;

  @media ${device.tablet} {
    padding-right: 2rem;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const StyledButtonContainer = styled(StyledHorizontalContainer)`
  width: 100%;
  justify-content: end;

  @media ${device.tablet} {
    width: auto;
  }
`;
