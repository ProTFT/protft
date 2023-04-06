import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { TournamentListItem } from "../TournamentListItem/TournamentListItem";
import { TournamentWithMaybePlayerResult } from "../Tournaments.types";
import { StyledTournamentList } from "./TournamentBaseList.styled";

interface BaseListProps {
  tournaments: TournamentWithMaybePlayerResult[] | undefined;
  searchQuery?: string;
  color?: string;
  isLive?: boolean;
}

export const TournamentBaseList = forwardRef<HTMLDivElement, BaseListProps>(
  ({ tournaments, color, isLive }, listEndRef) => {
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
        <div ref={listEndRef} />
      </StyledTournamentList>
    );
  }
);
