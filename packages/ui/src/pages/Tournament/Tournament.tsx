import React, { useCallback, Suspense, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { TournamentContent } from "../../components/TournamentContent/TournamentContent";
import { Stage } from "../../graphql/schema";
import { useIsMobile } from "../../hooks/useIsMobile";
import { getEventMetadata } from "../../seo/Event";
import { InfoBar } from "./InfoBar/InfoBar";
import {
  TournamentBySlugQueryResponse,
  TOURNAMENT_BY_SLUG_QUERY,
} from "./queries";
import { Stages } from "./Stages/Stages";
import {
  StyledBodyContainer,
  StyledHeaderContainer,
} from "./Tournament.styled";

const Results = React.lazy(() =>
  import("./Results/Results").then((m) => ({
    default: m.Results,
  }))
);

export const Tournament = () => {
  const { tournamentSlug } = useParams();
  const [{ data }] = useQuery<TournamentBySlugQueryResponse>({
    query: TOURNAMENT_BY_SLUG_QUERY,
    variables: { slug: tournamentSlug },
  });

  const description = useMemo(() => {
    const tournament = data?.tournamentBySlug;
    return `${tournament?.name} is a competitive Teamfight Tactics (TFT) tournament in the ${tournament?.region} region. ${tournament?.participantsNumber} players will face off to win a prize of ${tournament?.prizePool} ${tournament?.currency}.`;
  }, [data?.tournamentBySlug]);

  const [open, setOpen] = useState(false);
  const [openStage, setOpenStage] = useState<Stage | null>(null);

  const isMobile = useIsMobile();

  const onSelectStage = useCallback(
    (selectedStage: Stage) => {
      setOpen((isOpen) =>
        isOpen && openStage?.id !== selectedStage.id ? isOpen : !isOpen
      );
      setOpenStage((openStage) =>
        open && openStage?.id === selectedStage.id ? null : selectedStage
      );
    },
    [open, openStage?.id]
  );

  return (
    <>
      <Helmet>
        <title>{data?.tournamentBySlug.name}</title>
        <script type="application/ld+json">
          {getEventMetadata({
            name: data!.tournamentBySlug.name,
            description,
            startDateTime: data!.tournamentBySlug.startDate,
            endDateTime: data!.tournamentBySlug.endDate,
            image: `https://www.protft.com/sets/${
              data!.tournamentBySlug.setId
            }.webp`,
            host: data!.tournamentBySlug.host || "",
            streamLink: "https://www.twitch.tv/teamfighttactics",
          })}
        </script>
      </Helmet>
      <StyledHeaderContainer>
        <TournamentContent tournament={data!.tournamentBySlug} />
      </StyledHeaderContainer>
      <StyledBodyContainer>
        {isMobile && (
          <InfoBar
            participantsNumber={data?.tournamentBySlug.participantsNumber}
            prizePool={data?.tournamentBySlug.prizePool}
            currency={data?.tournamentBySlug.currency}
          />
        )}
        <Stages
          tournament={data?.tournamentBySlug}
          onSelectStage={onSelectStage}
          openStage={openStage}
        />
        <Suspense fallback={null}>
          <Results open={open} selectedStage={openStage} />
        </Suspense>
      </StyledBodyContainer>
    </>
  );
};
