import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "urql";
import { colors } from "../../../design/colors";
import { useObserver } from "../../../hooks/useObserver";
import { Pagination } from "../../../hooks/usePagination";
import { usePageVisibility } from "../../../hooks/useWindowFocus";
import {
  OngoingTournamentsQueryResult,
  ONGOING_TOURNAMENTS_QUERY,
  UpcomingTournamentsQueryResult,
  UPCOMING_TOURNAMENTS_QUERY,
  PAST_TOURNAMENTS_QUERY,
  FilteredTournamentArgs,
} from "../queries";
import { TournamentFilters } from "../TournamentsContext";
import { TournamentBaseList } from "./TournamentBaseList";

interface StateListProps {
  searchQuery: string;
  pagination: Pagination;
  filters: TournamentFilters;
  onLoadMore: () => void;
}

export const OngoingTournamentList = () => {
  const [{ data }, refetch] = useQuery<OngoingTournamentsQueryResult>({
    query: ONGOING_TOURNAMENTS_QUERY,
  });
  const orderedOngoing = useMemo(() => {
    const [nullStartTime, withStartTime] = [
      data?.ongoingTournaments.filter((t) => t.nextStartTime === null) ?? [],
      data?.ongoingTournaments.filter((t) => t.nextStartTime !== null) ?? [],
    ];
    return [
      ...[...withStartTime].sort((a, b) => a.nextStartTime! - b.nextStartTime!),
      ...nullStartTime,
    ];
  }, [data?.ongoingTournaments]);
  const isFocused = usePageVisibility();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  if (!orderedOngoing) {
    return null;
  }

  return (
    <TournamentBaseList
      tournaments={orderedOngoing}
      color={colors.darkPurple}
      isOngoing
    />
  );
};

export const UpcomingTournamentList = ({
  searchQuery,
  pagination,
  filters,
  onLoadMore,
}: StateListProps) => {
  const [{ data }] = useQuery<
    UpcomingTournamentsQueryResult,
    FilteredTournamentArgs
  >({
    query: UPCOMING_TOURNAMENTS_QUERY,
    variables: {
      searchQuery,
      ...pagination,
      ...filters,
    },
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useObserver(bottomRef, onLoadMore);

  return (
    <TournamentBaseList
      ref={bottomRef}
      tournaments={data?.upcomingTournaments}
    />
  );
};

export const PastTournamentList = ({
  searchQuery,
  filters,
  pagination,
  onLoadMore,
}: StateListProps) => {
  const [{ data }] = useQuery({
    query: PAST_TOURNAMENTS_QUERY,
    variables: {
      searchQuery,
      ...filters,
      ...pagination,
    },
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useObserver(bottomRef, onLoadMore);

  return (
    <TournamentBaseList ref={bottomRef} tournaments={data?.pastTournaments} />
  );
};
