import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { TournamentListItem } from "../TournamentListItem/TournamentListItem";
import { TournamentWithMaybePlayerResult } from "../Tournaments.types";
import { StyledTournamentList } from "./TournamentBaseList.styled";

interface BaseListProps {
  tournaments: TournamentWithMaybePlayerResult[] | undefined;
  searchQuery?: string;
  color?: string;
  isOngoing?: boolean;
}

export const TournamentBaseList = forwardRef<HTMLDivElement, BaseListProps>(
  ({ tournaments, color, isOngoing }, listEndRef) => {
    return (
      <StyledTournamentList>
        {tournaments?.map((tournament) => (
          <Link key={tournament.id} to={`/tournaments/${tournament.slug}`}>
            <TournamentListItem
              tournament={tournament}
              color={color}
              isOngoing={isOngoing}
            />
          </Link>
        ))}
        <div ref={listEndRef} />
      </StyledTournamentList>
    );
  }
);
