import { Stage } from "../../../../../../graphql/schema";
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
      </StyledInfoContainer>
    </StyledStageCard>
  );
};
