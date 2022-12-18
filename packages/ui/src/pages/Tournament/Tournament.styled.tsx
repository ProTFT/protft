import styled from "styled-components";
import { colors } from "../../design/colors";

export const StyledTournamentName = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledHeaderContainer = styled.header`
  display: flex;
  width: 100%;
  background-color: ${colors.otherBlack};
  box-shadow: 0px 12px 9px rgba(0, 0, 0, 0.25);
`;

export const StyledTournamentInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
  width: 60%;
`;

export const StyledInfoBar = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StyledBodyContainer = styled.div`
  background-color: ${colors.blackBackground};
  height: 100%;
`;

export const StyledInfoIndicatorText = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.3em;
  text-align: left;
  color: ${colors.white};
  text-transform: uppercase;
`;

export const StyledStagesSection = styled.div`
  height: 200px;
  width: 100%;
  background-color: ${colors.purple};
  border-radius: 16px 16px 0px 0px;
  margin-top: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledStagesBottom = styled.div`
  width: 100%;
  background-color: #1e1c35;
  padding: 1rem;
`;

export const StyledDaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: scroll;
  gap: 1rem;
`;

export const StyledDay = styled.div`
  background: #4739b2;
  padding: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 8rem;
`;

export const StyledTitle = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.27em;
  text-align: left;
`;

export const StyledSubsectionTitle = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.4em;
  text-align: left;
`;

export const StyledSubsectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledStageInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const StyledStageInfoValue = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 20px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.27em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledBattleIcon = styled.img.attrs({
  src: "/battle.png",
})`
  width: 44px;
  height: 44px;
`;

export const StyledDayTitle = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 36px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-align: center;
  color: ${colors.yellow};
`;

export const StyledDaySubtitle = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-align: center;
`;

export const StyledResultsContainer = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.blackTiles};
  max-height: ${(props) => (props.show ? "50rem" : "0px")};
  overflow: hidden;
  transition: max-height 1s ease-out;
  padding: 1rem;
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
`;

export const StyledTableRoundHeader = styled.th`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
`;

export const StyledTableData = styled.td`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: center;
`;

export const StyledTable = styled.table`
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  border-spacing: 1rem;
  margin: -1rem;
  border-collapse: separate;
`;

export const StyledMeh = styled.div`
  display: flex;
  justify-content: end;
`;
