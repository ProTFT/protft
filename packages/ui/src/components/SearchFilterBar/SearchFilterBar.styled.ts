import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";
import { StyledHorizontalContainer } from "../Layout/HorizontalContainer/HorizontalContainer.styled";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
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

export const StyledFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  @media ${device.tablet} {
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 50%;
  }
`;

export const StyledFilterText = styled.p`
  font-family: Roboto;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0.15em;
  text-align: center;
  color: ${colors.anotherGray};
  text-transform: uppercase;
`;

export const StyledAppliedFilter = styled.div`
  display: flex;
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

export const StyledAppliedFilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;
