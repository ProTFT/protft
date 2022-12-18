import { useQuery } from "urql";
import { useParams } from "react-router-dom";
import {
  PlayerQueryResult,
  PlayerTournamentQueryResult,
  PLAYER_QUERY,
  PLAYER_TOURNAMENT_QUERY,
} from "./queries";
import { useEffect } from "react";
import { StyledBodyContainer } from "../Tournament/Tournament.styled";
import { RegionIndicator } from "../../components/RegionIndicator/RegionIndicator";
import { Twitter } from "../../design/icons/Twitter";
import { colors } from "../../design/colors";
import {
  StyledContainer,
  StyledHorizontalContainer,
} from "../Tournaments/Tournaments.styled";
import {
  StyledHeaderContainer,
  StyledImage,
  StyledPlayerInfo,
  StyledPlayerName,
  StyledStat,
  StyledStatsContainer,
  StyledStatTitle,
  StyledStatValue,
  StyledTitle,
  StyledTournamentInfo,
  StyledTournamentName,
  StyledTourneyStatsContainer,
} from "./Player.styled";
import { RoundedContainer } from "../../components/Containers/RoundedContainer/RoundedContainer";
import { DateIndicator } from "../../components/DateIndicator/DateIndicator";
import { StyledDetailsButton } from "../Players/components/PlayerCard.styled";
import { ArrowRightIcon } from "../../design/icons/ArrowRight";
import { TextIconHorizontalContainer } from "../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { StyledSearchFilterBar } from "../../components/SearchFilterBar/SearchFilterBar";

export const Player = () => {
  const { playerId } = useParams();
  const [{ data }] = useQuery<PlayerQueryResult>({
    query: PLAYER_QUERY,
    variables: { id: Number(playerId) },
  });

  const [{ data: tournamentData }] = useQuery<PlayerTournamentQueryResult>({
    query: PLAYER_TOURNAMENT_QUERY,
    variables: { playerId: Number(playerId) },
  });

  useEffect(() => {
    document.title = `${data?.player.name}`;
  }, [data?.player.name]);

  return (
    <>
      <StyledHeaderContainer>
        <div
          style={{ width: "40%", height: "10rem", backgroundColor: "blue" }}
        />
        <StyledPlayerInfo>
          <StyledPlayerName>Mismatched Socks</StyledPlayerName>
          <RegionIndicator image="/brazil.png" name="Brazil" />
          <div style={{ alignSelf: "end" }}>
            <Twitter color={colors.white} onClick={() => {}} size={24} />
          </div>
        </StyledPlayerInfo>
      </StyledHeaderContainer>
      <StyledContainer>
        <StyledBodyContainer>
          <StyledSearchFilterBar />
        </StyledBodyContainer>
        <StyledStatsContainer>
          <StyledStat>
            <StyledStatTitle>Tourneys</StyledStatTitle>
            <StyledStatValue>13</StyledStatValue>
          </StyledStat>
          <StyledStat>
            <StyledStatTitle>Matches</StyledStatTitle>
            <StyledStatValue>145</StyledStatValue>
          </StyledStat>
          <StyledStat>
            <StyledStatTitle>Avg Pos</StyledStatTitle>
            <StyledStatValue>2.3</StyledStatValue>
          </StyledStat>
          <StyledStat>
            <StyledStatTitle>Top 4 %</StyledStatTitle>
            <StyledStatValue>59%</StyledStatValue>
          </StyledStat>
          <StyledStat>
            <StyledStatTitle>Top 1 %</StyledStatTitle>
            <StyledStatValue>2%</StyledStatValue>
          </StyledStat>
        </StyledStatsContainer>
      </StyledContainer>
      <StyledTourneyStatsContainer>
        <StyledTitle>Tourney Stats</StyledTitle>
        <StyledSearchFilterBar />
        <RoundedContainer padding="2rem" gap="2rem">
          <StyledHorizontalContainer>
            <StyledImage />
            <StyledVerticalContainer>
              <StyledTournamentName>World Cup Fates</StyledTournamentName>
              <StyledVerticalContainer>
                <RegionIndicator name="Brazil" image="/brazil.png" />
                <DateIndicator startDate="12/10" endDate="15/10" />
              </StyledVerticalContainer>
            </StyledVerticalContainer>
          </StyledHorizontalContainer>
          <StyledTournamentInfo>
            <StyledStat>
              <StyledStatTitle>Avg Pos</StyledStatTitle>
              <StyledStatValue>3.1</StyledStatValue>
            </StyledStat>
            <StyledStat>
              <StyledStatTitle>Top 4 %</StyledStatTitle>
              <StyledStatValue>66%</StyledStatValue>
            </StyledStat>
            <StyledHorizontalContainer>
              <StyledDetailsButton>Details</StyledDetailsButton>
              <ArrowRightIcon size={20} onClick={() => {}} />
            </StyledHorizontalContainer>
          </StyledTournamentInfo>
        </RoundedContainer>
        <RoundedContainer padding="2rem" gap="2rem">
          <StyledHorizontalContainer>
            <StyledImage />
            <StyledVerticalContainer>
              <StyledTournamentName>World Cup Fates</StyledTournamentName>
              <StyledVerticalContainer>
                <RegionIndicator name="Brazil" image="/brazil.png" />
                <DateIndicator startDate="12/10" endDate="15/10" />
              </StyledVerticalContainer>
            </StyledVerticalContainer>
          </StyledHorizontalContainer>
          <StyledTournamentInfo>
            <StyledStat>
              <StyledStatTitle>Avg Pos</StyledStatTitle>
              <StyledStatValue>3.1</StyledStatValue>
            </StyledStat>
            <StyledStat>
              <StyledStatTitle>Top 4 %</StyledStatTitle>
              <StyledStatValue>66%</StyledStatValue>
            </StyledStat>
            <StyledHorizontalContainer>
              <StyledDetailsButton>Details</StyledDetailsButton>
              <ArrowRightIcon size={20} onClick={() => {}} />
            </StyledHorizontalContainer>
          </StyledTournamentInfo>
        </RoundedContainer>
        <RoundedContainer padding="2rem" gap="2rem">
          <StyledHorizontalContainer>
            <StyledImage />
            <StyledVerticalContainer>
              <StyledTournamentName>World Cup Fates</StyledTournamentName>
              <StyledVerticalContainer>
                <RegionIndicator name="Brazil" image="/brazil.png" />
                <DateIndicator startDate="12/10" endDate="15/10" />
              </StyledVerticalContainer>
            </StyledVerticalContainer>
          </StyledHorizontalContainer>
          <StyledTournamentInfo>
            <StyledStat>
              <StyledStatTitle>Avg Pos</StyledStatTitle>
              <StyledStatValue>3.1</StyledStatValue>
            </StyledStat>
            <StyledStat>
              <StyledStatTitle>Top 4 %</StyledStatTitle>
              <StyledStatValue>66%</StyledStatValue>
            </StyledStat>
            <StyledHorizontalContainer>
              <StyledDetailsButton>Details</StyledDetailsButton>
              <ArrowRightIcon size={20} onClick={() => {}} />
            </StyledHorizontalContainer>
          </StyledTournamentInfo>
        </RoundedContainer>
      </StyledTourneyStatsContainer>
    </>
  );
};
