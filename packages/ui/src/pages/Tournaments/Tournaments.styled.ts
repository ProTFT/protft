import styled from "styled-components";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${colors.blackBackground};
  gap: 1rem;
`;

export const StyledHorizontalContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const StyledSetFilterContainer = styled(StyledHorizontalContainer)`
  flex: 2;
`;

export const StyledTournamentList = styled(StyledVerticalContainer)`
  gap: 2rem;

  @media ${device.tablet} {
    padding: 2rem;
  }
`;
