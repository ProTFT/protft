import React, { useCallback, Suspense, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { TournamentContent } from "../../components/TournamentContent/TournamentContent";
import { formatDateFromDB } from "../../formatter/Date";
import { Stage } from "../../graphql/schema";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useTracking } from "../../hooks/useTracking";
import { getEventMetadata } from "../../seo/Event";
import { TrackingEvents } from "../../tracking/Events";
import { InfoBar } from "./InfoBar/InfoBar";
import {
  TournamentBySlugQueryResponse,
  TOURNAMENT_BY_SLUG_QUERY,
} from "./queries";
import { SkeletonResultTable } from "./Results/ResultTable/SkeletonResultTable";
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
    const {
      name,
      region,
      participantsNumber,
      prizePool,
      currency,
      startDate,
      endDate,
    } = data?.tournamentBySlug ?? {};
    const formattedStartDate = formatDateFromDB(startDate);
    const formattedEndDate = formatDateFromDB(endDate);
    return `${name} is a competitive Teamfight Tactics (TFT) tournament in the ${region} region. From ${formattedStartDate} to ${formattedEndDate}, ${participantsNumber} players will face off to win a prize of ${prizePool} ${currency}.`;
  }, [data?.tournamentBySlug]);

  const [open, setOpen] = useState(false);
  const [openStage, setOpenStage] = useState<Stage | null>(null);

  const isMobile = useIsMobile();
  const { trackEvent } = useTracking();

  const onSelectStage = useCallback(
    (selectedStage: Stage) => {
      const hasClickedClosedStage = openStage?.id !== selectedStage.id;

      if (hasClickedClosedStage) {
        trackEvent(TrackingEvents.TOURNAMENT_STAGE_OPEN, {
          tournamentId: data?.tournamentBySlug.id || 0,
          tournamentName: data?.tournamentBySlug.name || "",
          stageId: selectedStage.id,
          stageName: selectedStage.name,
        });
      }

      setOpen(hasClickedClosedStage);
      setOpenStage(hasClickedClosedStage ? selectedStage : null);
    },
    [
      data?.tournamentBySlug.id,
      data?.tournamentBySlug.name,
      openStage?.id,
      trackEvent,
    ]
  );

  return (
    <>
      <Helmet>
        <title>{data?.tournamentBySlug.name}</title>
        <meta name="description" content={description} />
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
        <Suspense fallback={<SkeletonResultTable />}>
          <Results
            open={open}
            selectedStage={openStage}
            tournamentEndDate={data?.tournamentBySlug.endDate}
          />
        </Suspense>
      </StyledBodyContainer>
    </>
  );
};
