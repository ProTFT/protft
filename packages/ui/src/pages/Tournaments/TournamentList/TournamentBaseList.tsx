import { Link } from "react-router-dom";
import { Tournament } from "../../../graphql/schema";
import { TournamentListItem } from "../TournamentListItem/TournamentListItem";
import { StyledTournamentList } from "./TournamentBaseList.styled";

interface BaseListProps {
  tournaments: Tournament[] | undefined;
  searchQuery?: string;
  color?: string;
  isLive?: boolean;
}

export const TournamentBaseList = ({
  tournaments,
  color,
  isLive,
}: BaseListProps) => {
  return (
    <StyledTournamentList>
      {tournaments?.map((tournament) => (
        <Link key={tournament.id} to={`/tournaments/${tournament.slug}`}>
          <TournamentListItem
            tournament={tournament}
            color={color}
            isLive={isLive}
          />
        </Link>
      ))}
    </StyledTournamentList>
  );
};
