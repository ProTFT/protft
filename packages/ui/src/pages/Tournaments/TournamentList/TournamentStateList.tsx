import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
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
import { EventInput, EventSourceInput } from "@fullcalendar/core";
import { CalendarWrapper } from "../../../components/Calendar/Calendar";

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
  const isFocused = usePageVisibility();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  if (!data?.ongoingTournaments.length) {
    return null;
  }

  return (
    <TournamentBaseList
      tournaments={data?.ongoingTournaments}
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

  const events = useMemo<EventSourceInput | undefined>(() => {
    return data?.pastTournaments.map<EventInput>((tournament) => ({
      id: String(tournament.id),
      start: tournament.startDate,
      end: tournament.endDate,
      title: tournament.name,
      allDay: false,
      display: "block",
    }));
  }, [data?.pastTournaments]);
  console.log(events);

  const bottomRef = useRef<HTMLDivElement>(null);

  useObserver(bottomRef, onLoadMore);

  return (
    <CalendarWrapper>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        defaultAllDay={false}
        events={events}
      />
      <TournamentBaseList ref={bottomRef} tournaments={data?.pastTournaments} />
    </CalendarWrapper>
  );
};
