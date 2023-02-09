import { useQuery } from "urql";
import { useParams } from "react-router-dom";
import {
  PlayerBySlugQueryResult,
  PlayerTournamentQueryResult,
  PLAYER_BY_SLUG_QUERY,
  PLAYER_TOURNAMENT_QUERY,
} from "./queries";
import { StyledPageContainer } from "./Player.styled";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Header } from "./Header/Header";
import { Stats } from "./Stats/Stats";
import { TourneyStats } from "./TourneyStats/TourneyStats";

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

  useDocumentTitle(data?.playerBySlug.name || "Loading");

  return (
    <StyledPageContainer>
      <Header player={data?.playerBySlug} />
      <Stats player={data?.playerBySlug} />
      <TourneyStats tournaments={tournamentData?.tournamentsPlayed} />
    </StyledPageContainer>
  );
};
