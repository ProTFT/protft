import styled from "styled-components";
import { StyledHorizontalContainer } from "../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledContainer = styled(StyledVerticalContainer)`
  align-items: center;

  @media ${device.desktop} {
    padding: 4rem;
  }
`;

export const StyledPlayerTableContainer = styled(StyledVerticalContainer)`
  margin-top: 2rem;
  width: 100%;
  overflow-x: auto;

  @media ${device.desktop} {
    width: 60%;
  }
`;

export const StyledPlayerTableHeader = styled.thead`
  background-color: ${colors.yellow};
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0.1em;
  padding: 0.5rem;
`;

export const StyledPlayerTableHeaderData = styled.th`
  padding: 0.5rem;
  text-align: center;
`;

export const StyledPlayerTable = styled.table`
  white-space: nowrap;
  border-spacing: 0rem;
  border-collapse: collapse;
  width: 100%;

  tr:nth-child(odd) {
    background-color: ${colors.dividerGray};
  }
`;

export const StyledPlayerRowData = styled.td<{ center?: boolean }>`
  ${({ center = true }) => `
    font-family: Roboto;
    font-size: 15px;
    font-weight: 600;
    line-height: 25px;
    letter-spacing: 0.1em;
    padding: 0.5rem;
    color: ${colors.white};
    ${center && `text-align: center;`}
  `}
`;

export const StyledStatsFilters = styled(StyledVerticalContainer)`
  gap: 1rem;
  margin-top: 1rem;
  justify-content: start;
  width: 100%;

  @media ${device.tablet} {
    width: 60%;
  }
`;

export const StyledButtonContainer = styled(StyledHorizontalContainer)`
  width: 100%;
  padding: 2rem;
  justify-content: center;
`;
