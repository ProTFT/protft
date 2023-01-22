import styled from "styled-components";
import { StyledHorizontalContainer } from "../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

interface StageProps {
  isFinal: boolean;
}

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

export const StyledTournamentInfo = styled(StyledHorizontalContainer)`
  align-items: center;
`;

export const StyledBodyContainer = styled.div`
  background-color: ${colors.blackBackground};
  height: 100%;

  @media ${device.tablet} {
    padding: 2rem 6rem 2rem 6rem;
  }
`;

export const StyledStagesSection = styled.div`
  width: 100%;
  background-color: ${colors.purple};
  border-radius: 16px 16px 0px 0px;
  margin-top: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media ${device.tablet} {
    flex-direction: row;
    gap: 10rem;
    align-items: center;
  }
`;

export const StyledStagesBottom = styled.div`
  width: 100%;
  background-color: #1e1c35;
  padding: 1rem;
`;

export const StyledDaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: auto;
  gap: 1rem;

  @media ${device.tablet} {
    justify-content: space-around;
  }
`;

export const StyledDay = styled.div<StageProps & { clicked?: boolean }>`
  ${({ isFinal, clicked }) => `
    background: ${isFinal ? "#FAAC01" : "#4739b2"};
    padding: 1rem 2rem 1rem 2rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 8rem;
    justify-content: space-between;
    cursor: pointer;

    svg {
      rotate: ${clicked ? "90deg" : "0"};
      transition: rotate .2s ease-in-out
    }
`}
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

export const StyledSubsectionContainer = styled(StyledVerticalContainer)`
  justify-content: space-between;

  @media ${device.tablet} {
    gap: 10rem;
    flex-direction: row;
  }
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

export const StyledDayTitle = styled.p<StageProps>`
  font-family: VTF Redzone Classic;
  font-size: 36px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-align: center;
  color: ${({ isFinal }) => (isFinal ? colors.pitchBlack : colors.yellow)};
`;

export const StyledDaySubtitle = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

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

export const StyledArrowContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const StyledTournamentImage = styled.div`
  width: 40%;
  height: 10rem;
  background-color: blue;

  @media ${device.tablet} {
    width: 20%;
  }
`;

export const StyledTablePlayerName = styled(StyledHorizontalContainer)`
  gap: 1rem;
`;
