import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { DateIndicator } from "../../components/DateIndicator/DateIndicator";
import { RegionIndicator } from "../../components/RegionIndicator/RegionIndicator";
import { colors } from "../../design/colors";
import { ArrowRightIcon } from "../../design/icons/ArrowRight";
import { StyledHorizontalContainer } from "../Tournaments/Tournaments.styled";
import { TournamentQueryResponse, TOURNAMENT_QUERY } from "./queries";
import {
  StyledBodyContainer,
  StyledDay,
  StyledDaysContainer,
  StyledHeaderContainer,
  StyledInfoBar,
  StyledInfoIndicatorText,
  StyledStagesBottom,
  StyledStagesSection,
  StyledTournamentName,
  StyledTournamentInfo,
  StyledTitle,
  StyledSubsectionTitle,
  StyledSubsectionContainer,
  StyledStageInfoContainer,
  StyledStageInfoValue,
  StyledBattleIcon,
  StyledDayTitle,
  StyledDaySubtitle,
  StyledResultsContainer,
  StyledTournamentModeButton,
  StyledPlayerName,
  StyledTablePlayerHeader,
  StyledTableRoundHeader,
  StyledTableData,
  StyledTable,
  StyledMeh,
} from "./Tournament.styled";

export const Tournament = () => {
  const { tournamentId } = useParams();
  const [{ data }] = useQuery<TournamentQueryResponse>({
    query: TOURNAMENT_QUERY,
    variables: { id: Number(tournamentId) },
  });
  useEffect(() => {
    document.title = `${data?.tournament.name}`;
  }, [data?.tournament.name]);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <StyledHeaderContainer>
        <div
          style={{ width: "40%", height: "10rem", backgroundColor: "blue" }}
        />
        <StyledTournamentInfo>
          <StyledTournamentName>Dragonlands</StyledTournamentName>
          <div>
            <RegionIndicator image="/brazil.png" name="Brazil" />
            <DateIndicator startDate="12/01/22" endDate="13/01/22" />
          </div>
        </StyledTournamentInfo>
      </StyledHeaderContainer>
      <StyledBodyContainer>
        <StyledInfoBar>
          <StyledHorizontalContainer>
            <img src="/calendar.png" alt="calendar" />
            <StyledInfoIndicatorText>24 players</StyledInfoIndicatorText>
          </StyledHorizontalContainer>
          <StyledHorizontalContainer>
            <img src="/calendar.png" alt="calendar" />
            <StyledInfoIndicatorText>U$ 6.980,00</StyledInfoIndicatorText>
          </StyledHorizontalContainer>
        </StyledInfoBar>
        <StyledStagesSection>
          <StyledHorizontalContainer>
            <StyledBattleIcon />
            <StyledTitle>Stages</StyledTitle>
          </StyledHorizontalContainer>
          <StyledSubsectionContainer>
            <StyledStageInfoContainer>
              <StyledSubsectionTitle>HOST</StyledSubsectionTitle>
              <StyledStageInfoValue>Riot Games</StyledStageInfoValue>
            </StyledStageInfoContainer>
            <StyledStageInfoContainer>
              <StyledSubsectionTitle>SET</StyledSubsectionTitle>
              <StyledStageInfoValue>4 - Fates</StyledStageInfoValue>
            </StyledStageInfoContainer>
          </StyledSubsectionContainer>
        </StyledStagesSection>
        <StyledStagesBottom>
          <StyledDaysContainer>
            <StyledDay>
              <StyledDayTitle>Day 1</StyledDayTitle>
              <StyledDaySubtitle>Round of 24</StyledDaySubtitle>
              <ArrowRightIcon
                color={colors.yellow}
                onClick={() => setOpen((v) => !v)}
              />
            </StyledDay>
            <StyledDay>
              <StyledDayTitle>Day 2</StyledDayTitle>
              <StyledDaySubtitle>Round of 24</StyledDaySubtitle>
              <StyledMeh>
                <ArrowRightIcon color={colors.yellow} onClick={() => {}} />
              </StyledMeh>
            </StyledDay>
            <StyledDay>
              <StyledDayTitle>Day 3</StyledDayTitle>
              <StyledDaySubtitle>Round of 24</StyledDaySubtitle>
              <StyledMeh>
                <ArrowRightIcon color={colors.yellow} onClick={() => {}} />
              </StyledMeh>
            </StyledDay>
            <StyledDay>
              <StyledDayTitle>Day 4</StyledDayTitle>
              <StyledDaySubtitle>Round of 24</StyledDaySubtitle>
              <StyledMeh>
                <ArrowRightIcon color={colors.yellow} onClick={() => {}} />
              </StyledMeh>
            </StyledDay>
          </StyledDaysContainer>
        </StyledStagesBottom>
        <StyledResultsContainer show={open}>
          <StyledTournamentModeButton>Lobbies</StyledTournamentModeButton>
          <StyledTable>
            <thead>
              <StyledTablePlayerHeader>Player</StyledTablePlayerHeader>
              <StyledTableRoundHeader>P</StyledTableRoundHeader>
              <StyledTableRoundHeader>R1</StyledTableRoundHeader>
              <StyledTableRoundHeader>R2</StyledTableRoundHeader>
              <StyledTableRoundHeader>R3</StyledTableRoundHeader>
              <StyledTableRoundHeader>R4</StyledTableRoundHeader>
              <StyledTableRoundHeader>R5</StyledTableRoundHeader>
              <StyledTableRoundHeader>R6</StyledTableRoundHeader>
            </thead>
            <tbody>
              <tr>
                <td>
                  <StyledHorizontalContainer>
                    <RegionIndicator image="/brazil.png" />
                    <StyledPlayerName>Mismatched Socks</StyledPlayerName>
                  </StyledHorizontalContainer>
                </td>
                <StyledTableData>2</StyledTableData>
                <StyledTableData>2</StyledTableData>
                <StyledTableData>2</StyledTableData>
                <StyledTableData>2</StyledTableData>
                <StyledTableData>1</StyledTableData>
                <StyledTableData>2</StyledTableData>
                <StyledTableData>1</StyledTableData>
              </tr>
            </tbody>
          </StyledTable>
        </StyledResultsContainer>
      </StyledBodyContainer>
    </div>
  );
};
