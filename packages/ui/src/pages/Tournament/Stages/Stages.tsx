import { useCallback } from "react";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../design/colors";
import { ArrowRightIcon } from "../../../design/icons/ArrowRight";
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
  StyledSubsectionContainer,
  StyledSubsectionTitle,
  StyledTitle,
} from "./Stages.styled";

interface Props {
  tournament?: Tournament;
  onSelectStage: (selectedStage: Stage) => void;
  openStage: Stage | null;
}

export const Stages = ({ tournament, onSelectStage, openStage }: Props) => {
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
        </StyledSubsectionContainer>
      </StyledStagesSection>
      <StyledStagesBottom>
        <StyledDaysContainer>
          {tournament?.stages?.map((stage) => (
            <StyledDay
              key={stage.id}
              isFinal={stage.isFinal}
              clicked={isDayClicked(stage)}
              onClick={onClickDay(stage)}
            >
              <StyledDayTitle isFinal={stage.isFinal}>
                {stage.name}
              </StyledDayTitle>
              <StyledDaySubtitle>{stage.description}</StyledDaySubtitle>
              <StyledArrowContainer>
                <ArrowRightIcon
                  color={stage.isFinal ? colors.pitchBlack : colors.yellow}
                />
              </StyledArrowContainer>
            </StyledDay>
          ))}
        </StyledDaysContainer>
      </StyledStagesBottom>
    </>
  );
};
