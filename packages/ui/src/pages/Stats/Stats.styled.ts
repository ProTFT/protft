import styled from "styled-components";
import { StyledHorizontalContainer } from "../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";
import { StyledBody } from "../../design/fonts/Fonts";

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
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0.1em;
  padding: 0.5rem;
`;

export const StyledPlayerTableHeaderRow = styled.tr`
  background-color: ${colors.yellow};
`;

export const StyledPlayerTableHeaderData = styled.th<{
  onClick?: () => void;
}>`
  ${({ onClick }) => `
    padding: 0.5rem;
    text-align: center;
    ${onClick && "cursor: pointer;"}
  `}
`;

export const StyledPlayerTable = styled.table`
  white-space: nowrap;
  border-spacing: 0rem;
  border-collapse: collapse;
  width: 100%;

  tr:nth-child(even):not(:first-child) {
    background-color: ${colors.dividerGray};
  }
`;

export const StyledStatsFilters = styled(StyledVerticalContainer)`
  gap: 1rem;
  margin-top: 1rem;
  justify-content: start;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;

  @media ${device.tablet} {
    width: 60%;
    padding: 0;
  }
`;

export const StyledButtonContainer = styled(StyledHorizontalContainer)`
  width: 100%;
  padding: 2rem;
  justify-content: center;
`;

export const StyledTitleContainer = styled(StyledHorizontalContainer)`
  justify-content: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  border-radius: 2px;
  padding: 0.5rem;
`;

export const StyledFilterContainer = styled(StyledVerticalContainer)`
  @media ${device.tablet} {
    flex-direction: row;
  }
`;

export const StyledFilterLabel = styled(StyledBody)`
  @media ${device.tablet} {
    width: 50%;
  }
`;
