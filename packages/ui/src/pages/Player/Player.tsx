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
import { Suspense, useMemo } from "react";
import { StatsSkeleton } from "./Stats/Stats.skeleton";
import { byIso } from "country-code-lookup";

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

  const description = useMemo(() => {
    const { name, country, region } = data?.playerBySlug ?? {};
    const playerCountry = byIso(country ?? "") || "No Country representation";
    return `${name} is a competitive Teamfight Tactics (TFT) player, native from ${playerCountry}, who plays in the ${region} region`;
  }, [data?.playerBySlug]);

  return (
    <StyledPageContainer>
      <Helmet>
        <title>{data?.playerBySlug.name || "Loading"}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header player={data?.playerBySlug} />
      <Suspense fallback={<StatsSkeleton />}>
        <Stats playerId={data?.playerBySlug.id} />
      </Suspense>
      <TourneyStats tournaments={tournamentData?.tournamentsPlayed} />
    </StyledPageContainer>
  );
};
