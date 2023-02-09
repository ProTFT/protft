import { RoundedContainer } from "../../../components/Containers/RoundedContainer/RoundedContainer";
import {
  StyledPlayerCardBottom,
  StyledPlayerCardHeader,
  StyledPlayerInfo,
  StyledSkeletonRectangle,
} from "./PlayerCard.styled";

export const PlayerCardSkeleton = () => {
  return (
    <RoundedContainer padding="3rem">
      <StyledPlayerCardHeader>
        <StyledPlayerInfo>
          <StyledSkeletonRectangle />
        </StyledPlayerInfo>
      </StyledPlayerCardHeader>
      <StyledPlayerCardBottom>
        <StyledSkeletonRectangle />
      </StyledPlayerCardBottom>
    </RoundedContainer>
  );
};
