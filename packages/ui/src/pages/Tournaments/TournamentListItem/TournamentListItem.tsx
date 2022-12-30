import { Tournament } from "../../../graphql/schema";
import { StyledListItem } from "./TournamentListItem.styled";
import { TournamentContent } from "../../../components/TournamentContent/TournamentContent";

interface Props {
  tournament: Tournament;
}

export const TournamentListItem = ({ tournament }: Props) => {
  return (
    <StyledListItem>
      <TournamentContent tournament={tournament} />
    </StyledListItem>
  );
};
