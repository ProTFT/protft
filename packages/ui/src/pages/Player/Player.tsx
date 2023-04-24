import { useQuery } from "urql";
import { useParams } from "react-router-dom";
import {
  PlayerBySlugQueryResult,
  PlayerTournamentQueryResult,
  PLAYER_BY_SLUG_QUERY,
  PLAYER_TOURNAMENT_QUERY,
} from "./queries";
import { StyledPageContainer } from "./Player.styled";
import { Header } from "./Header/Header";
import { Stats } from "./Stats/Stats";
import { TourneyStats } from "./TourneyStats/TourneyStats";
import { Helmet } from "react-helmet";

export const Player = () => {
  const { playerSlug } = useParams();
  const [{ data }] = useQuery<PlayerBySlugQueryResult>({
    query: PLAYER_BY_SLUG_QUERY,
    variables: { slug: playerSlug },
  });

  const [{ data: tournamentData }] = useQuery<PlayerTournamentQueryResult>({
    query: PLAYER_TOURNAMENT_QUERY,
    variables: { playerId: Number(playerSlug?.split("-")[0]) },
  });

  return (
    <StyledPageContainer>
      <Helmet>
        <title>{data?.playerBySlug.name || "Loading"}</title>
      </Helmet>
      <Header player={data?.playerBySlug} />
      <Stats player={data?.playerBySlug} />
      <TourneyStats tournaments={tournamentData?.tournamentsPlayed} />
    </StyledPageContainer>
  );
};
