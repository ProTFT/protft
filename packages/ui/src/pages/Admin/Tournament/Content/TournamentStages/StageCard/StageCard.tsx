import { Stage } from "../../../../../../graphql/schema";
import { toLocaleDateTimeString } from "../../../../Stage/Content/AdminStageHeader";
import {
  StyledInfo,
  StyledInfoContainer,
  StyledStageCard,
  StyledTitle,
} from "./StageCard.styled";

interface Props {
  stage: Stage;
}

export const StageCard = ({ stage }: Props) => {
  return (
    <StyledStageCard>
      <StyledInfoContainer>
        <StyledTitle>{stage.name}</StyledTitle>
        <StyledInfo>#{stage.sequence}</StyledInfo>
        <StyledInfo>Description: {stage.description}</StyledInfo>
        <StyledInfo>Rounds: {stage.roundCount}</StyledInfo>
        <StyledInfo>Point Schema: {stage.pointSchema.name}</StyledInfo>
        {stage.startDateTime && (
          <StyledInfo>
            Time: {toLocaleDateTimeString(new Date(stage.startDateTime))}
          </StyledInfo>
        )}
      </StyledInfoContainer>
    </StyledStageCard>
  );
};
