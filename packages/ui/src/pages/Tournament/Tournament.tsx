import React, { useCallback, Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { TournamentContent } from "../../components/TournamentContent/TournamentContent";
import { Stage } from "../../graphql/schema";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useIsMobile } from "../../hooks/useIsMobile";
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

  useDocumentTitle(`${data?.tournamentBySlug.name}`);

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
