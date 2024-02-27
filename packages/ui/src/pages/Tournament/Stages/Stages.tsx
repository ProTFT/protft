import { lazy, Suspense, useCallback, useState } from "react";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../design/colors";
import { StyledBody } from "../../../design/fonts/Fonts";
import { ArrowRightIcon } from "../../../design/icons/ArrowRight";
import { Stream } from "../../../design/icons/Stream";
import { Stage, Tournament } from "../../../graphql/schema";
import {
  StyledArrowContainer,
  StyledBattleIcon,
  StyledDay,
  StyledDaysContainer,
  StyledDaySubtitle,
  StyledDayTitle,
  StyledStageInfoContainer,
  StyledStageInfoValue,
  StyledStagesBottom,
  StyledStagesSection,
  StyledStreamContainer,
  StyledSubsectionContainer,
  StyledSubsectionTitle,
  StyledTitle,
} from "./Stages.styled";

const StreamDrawer = lazy(() =>
  import("./StreamDrawer/StreamDrawer").then((m) => ({
    default: m.StreamDrawer,
  }))
);

interface Props {
  tournament?: Omit<Tournament, "slug" | "visibility">;
  onSelectStage: (selectedStage: Stage) => void;
  openStage: Stage | null;
}

export const Stages = ({ tournament, onSelectStage, openStage }: Props) => {
  const [streamDrawerOpen, setStreamDrawerOpen] = useState(false);

  const toggleStreamDrawer = useCallback(() => {
    setStreamDrawerOpen((curr) => !curr);
  }, []);

  const onClickDay = useCallback(
    (stage: Stage) => () => {
      onSelectStage(stage);
    },
    [onSelectStage]
  );

  const isDayClicked = useCallback(
    (stage: Stage) => openStage?.id === stage.id,
    [openStage?.id]
  );

  return (
    <>
      {streamDrawerOpen && (
        <Suspense>
          <StreamDrawer
            tournamentId={tournament?.id}
            isOpen={streamDrawerOpen}
            onClose={toggleStreamDrawer}
          />
        </Suspense>
      )}
      <StyledStagesSection>
        <StyledHorizontalContainer>
          <StyledBattleIcon />
          <StyledTitle>Stages</StyledTitle>
        </StyledHorizontalContainer>
        <StyledSubsectionContainer>
          <StyledStageInfoContainer>
            <StyledSubsectionTitle>HOST</StyledSubsectionTitle>
            <StyledStageInfoValue>{tournament?.host}</StyledStageInfoValue>
          </StyledStageInfoContainer>
          <StyledStageInfoContainer>
            <StyledSubsectionTitle>SET</StyledSubsectionTitle>
            <StyledStageInfoValue>{`${tournament?.set.id} - ${tournament?.set.name}`}</StyledStageInfoValue>
          </StyledStageInfoContainer>
          <StyledStreamContainer animate={false}>
            <Stream size={32} onClick={toggleStreamDrawer} />
            <StyledBody>Streams</StyledBody>
          </StyledStreamContainer>
        </StyledSubsectionContainer>
      </StyledStagesSection>
      <StyledStagesBottom>
        <StyledDaysContainer>
          {tournament?.stages?.map((stage) => (
            <StyledDay
              key={stage.id}
              clicked={isDayClicked(stage)}
              onClick={onClickDay(stage)}
            >
              <StyledDayTitle>{stage.name}</StyledDayTitle>
              <StyledDaySubtitle>{stage.description}</StyledDaySubtitle>
              <StyledArrowContainer>
                <ArrowRightIcon color={colors.yellow} />
              </StyledArrowContainer>
            </StyledDay>
          ))}
        </StyledDaysContainer>
      </StyledStagesBottom>
    </>
  );
};
