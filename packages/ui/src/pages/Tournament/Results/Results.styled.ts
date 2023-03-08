import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../../design/breakpoints";
import { colors } from "../../../design/colors";

export const StyledResultsContainer = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: #1e1c35;
  ${(props) => (!props.show ? "max-height: 0px" : "max-height: fit-content")};
  overflow: auto;
  transition: max-height 1s ease-out;
  align-items: center;

  @media ${device.tablet} {
    padding: 1rem;
  }
`;

export const StyledLobbyResultsContainer = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #1e1c35;
  ${(props) => (!props.show ? "max-height: 0px" : "max-height: fit-content")};
  overflow: auto;
  transition: max-height 1s ease-out;
  flex-wrap: wrap;

  @media ${device.tablet} {
    gap: 5rem;
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledPlayerName = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
`;

export const StyledTablePlayerHeader = styled.th`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.4em;
  text-align: left;
  text-transform: uppercase;
  color: ${colors.white};
`;

export const StyledTableRoundHeader = styled.th`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
  padding: 0.5rem;
  color: ${colors.white};
`;

export const StyledTableData = styled.td<{
  highlighted?: boolean;
}>`
  ${({ highlighted }) => `
    font-family: Roboto;
    font-size: 15px;
    font-weight: 600;
    line-height: 38px;
    letter-spacing: 0.1em;
    text-align: center;
    padding: 0.5rem;
    color: ${highlighted ? colors.yellow : colors.text};
  `}
`;

export const StyledTable = styled.table`
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  border-spacing: 0rem;
  border-collapse: separate;
  width: 100%;

  tr:nth-child(odd) {
    background-color: ${colors.navBarBlack};
  }

  @media ${device.tablet} {
    width: auto;
  }
`;

export const StyledTablePlayerName = styled(StyledHorizontalContainer)`
  gap: 1rem;
`;

export const StyledLobbyGroupContainer = styled(StyledHorizontalContainer)`
  gap: 2rem;
`;

export const StyledLobbyContainer = styled(StyledVerticalContainer)`
  gap: 2rem;
`;

export const StyledButtonBar = styled(StyledHorizontalContainer)`
  width: 100%;
  background-color: #1e1c35;
  padding-top: 2rem;
  padding-bottom: 2rem;
  justify-content: center;

  @media ${device.desktop} {
    justify-content: flex-end;
    padding-right: 20%;
  }
`;

export const StyledLobbyName = styled.p`
  align-self: center;
  font-family: VTF Redzone Classic;
  font-size: 32px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.27em;
  text-align: left;
`;

export const StyledTableRow = styled.tr<{
  index: number;
  qualifiedCount: number;
  hasQualifier: boolean;
}>`
  ${({ index, qualifiedCount, hasQualifier }) =>
    index < qualifiedCount &&
    hasQualifier &&
    ((index % 2 === 0 &&
      `background-color: rgba(37, 75, 2, 0.2) !important;`) ||
      `background-color: rgba(37, 75, 2, 0.4) !important;`)}
`;
