import { StyledListItem } from "./TournamentListItem.styled";
import { TournamentContent } from "../../../components/TournamentContent/TournamentContent";
import { TournamentWithMaybePlayerResult } from "../Tournaments.types";

interface Props {
  tournament: TournamentWithMaybePlayerResult;
  color?: string;
  isOngoing?: boolean;
}

export const TournamentListItem = ({
  tournament,
  color,
  isOngoing = false,
}: Props) => {
  return (
    <StyledListItem bgColor={color}>
      <TournamentContent tournament={tournament} isOngoing={isOngoing} />
    </StyledListItem>
  );
};
