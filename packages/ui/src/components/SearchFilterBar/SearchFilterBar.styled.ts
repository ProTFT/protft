import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";
import { StyledHorizontalContainer } from "../Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../Layout/VerticalContainer/VerticalContainer.styled";

export const StyledContainer = styled(StyledVerticalContainer)`
  gap: 1rem;
  width: 100%;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export const StyledFilterBar = styled(StyledHorizontalContainer)`
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  @media ${device.tablet} {
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 50%;
  }
`;

export const StyledAppliedFilter = styled(StyledHorizontalContainer)`
  background-color: ${colors.fiftyShadesOfGray};
  border-radius: 4px;
  padding: 0.5rem;
  font-family: Roboto;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${colors.white};
`;

export const StyledAppliedFilterContainer = styled(StyledHorizontalContainer)`
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;
