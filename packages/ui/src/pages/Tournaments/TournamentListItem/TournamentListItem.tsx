import { StyledListItem } from "./TournamentListItem.styled";
import { TournamentContent } from "../../../components/TournamentContent/TournamentContent";
import { TournamentWithMaybePlayerResult } from "../Tournaments.types";

interface Props {
  tournament: TournamentWithMaybePlayerResult;
  color?: string;
  isLive?: boolean;
}

export const TournamentListItem = ({
  tournament,
  color,
  isLive = false,
}: Props) => {
  return (
    <StyledListItem bgColor={color}>
      <TournamentContent tournament={tournament} isLive={isLive} />
    </StyledListItem>
  );
};
