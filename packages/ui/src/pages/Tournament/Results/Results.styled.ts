import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
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

export const StyledTournamentModeButton = styled.button`
  font-family: Roboto;
  font-size: 11px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0.2em;
  text-align: left;
  color: ${colors.yellow};
  text-transform: uppercase;
  background-color: ${colors.blackTiles};
  align-self: flex-end;
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
