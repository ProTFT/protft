import { Tournament } from "../../../graphql/schema";
import { StyledListItem } from "./TournamentListItem.styled";
import { TournamentContent } from "../../../components/TournamentContent/TournamentContent";

interface Props {
  tournament: Tournament;
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
