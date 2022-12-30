import { useQuery } from "urql";
import { Link, useParams } from "react-router-dom";
import {
  PlayerQueryResult,
  PlayerTournamentQueryResult,
  PLAYER_QUERY,
  PLAYER_TOURNAMENT_QUERY,
} from "./queries";
import { useEffect } from "react";
import { RegionsIndicator } from "../../components/RegionIndicator/RegionIndicator";
import { Twitter } from "../../design/icons/Twitter";
import { colors } from "../../design/colors";
import {
  StyledDetailsButtonContainer,
  StyledHeaderContainer,
  StyledImage,
  StyledPageContainer,
  StyledPlayerImage,
  StyledPlayerInfo,
  StyledPlayerName,
  StyledStatsContainer,
  StyledTitle,
  StyledTournamentBasicInfo,
  StyledTournamentName,
  StyledTourneyStatsContainer,
} from "./Player.styled";
import { RoundedContainer } from "../../components/Containers/RoundedContainer/RoundedContainer";
import { DateIndicator } from "../../components/DateIndicator/DateIndicator";
import { ArrowRightIcon } from "../../design/icons/ArrowRight";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { StyledSearchFilterBar } from "../../components/SearchFilterBar/SearchFilterBar";
import { Stat } from "../../components/Stat/Stat";
import { StyledDetailsButton } from "../Players/components/PlayerCard.styled";

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

  if (!data) {
    return <></>;
  }

  return (
    <StyledPageContainer>
      <StyledHeaderContainer>
        <StyledPlayerImage />
        <StyledPlayerInfo>
          <StyledPlayerName>{data?.player.name}</StyledPlayerName>
          <RegionsIndicator regionCodes={[data?.player.region!]} />
          <div style={{ alignSelf: "end" }}>
            <Twitter color={colors.white} onClick={() => {}} size={24} />
          </div>
        </StyledPlayerInfo>
      </StyledHeaderContainer>
      <StyledStatsContainer>
        <Stat title="Matches" value={data?.player.playerStats?.totalGames} />
        <Stat
          title="Avg Pos"
          value={data?.player.playerStats?.averagePosition}
        />
        <Stat title="Top 4 %" value={data?.player.playerStats?.topFourCount} />
        <Stat title="Top 1 %" value={data?.player.playerStats?.topOneCount} />
      </StyledStatsContainer>
      <StyledTourneyStatsContainer>
        <StyledTitle>Tourney Stats</StyledTitle>
        <StyledSearchFilterBar placeholder="Search tourneys" />
        {tournamentData?.tournamentsPlayed.map((tournament) => (
          <Link to={`/tournaments/${tournament.id}`} key={tournament.id}>
            <RoundedContainer padding="2rem" gap="2rem">
              <StyledTournamentBasicInfo>
                <StyledImage src={`/sets/${tournament.set.id}.webp`} />
                <StyledVerticalContainer>
                  <StyledTournamentName>{tournament.name}</StyledTournamentName>
                  <StyledVerticalContainer>
                    <RegionsIndicator regionCodes={tournament.region!} />
                    <DateIndicator
                      startDate={tournament.startDate}
                      endDate={tournament.endDate}
                    />
                  </StyledVerticalContainer>
                </StyledVerticalContainer>
              </StyledTournamentBasicInfo>
              {/* <StyledTournamentInfo>
                <Stat title="Matches" value="145" />
                <Stat title="Avg Pos" value="2.3" />
                <Stat title="Top 4 %" value="59%" />
                <Stat title="Top 1 %" value="2%" />
              </StyledTournamentInfo> */}
              <StyledDetailsButtonContainer>
                <StyledDetailsButton>Details</StyledDetailsButton>
                <ArrowRightIcon size={20} onClick={() => {}} />
              </StyledDetailsButtonContainer>
            </RoundedContainer>
          </Link>
        ))}
      </StyledTourneyStatsContainer>
    </StyledPageContainer>
  );
};
