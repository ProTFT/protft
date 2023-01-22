import { StyledListItem } from "./TournamentListItem.styled";
import { TournamentContentSkeleton } from "../../../components/TournamentContent/TournamentContent.skeleton";

export const TournamentListItemSkeleton = () => {
  return (
    <StyledListItem>
      <TournamentContentSkeleton />
    </StyledListItem>
  );
};
