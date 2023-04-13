import { useQuery } from "urql";
import { colors } from "../../../design/colors";
import {
  OngoingTournamentsQueryResult,
  ONGOING_TOURNAMENTS_QUERY,
  UpcomingTournamentsQueryResult,
  UPCOMING_TOURNAMENTS_QUERY,
  PastTournamentsQueryResult,
  PAST_TOURNAMENTS_QUERY,
} from "../queries";
import { TournamentFilters } from "../Tournaments";
import { TournamentBaseList } from "./TournamentBaseList";

interface StateListProps {
  searchQuery: string;
  filters: TournamentFilters;
}

export const OngoingTournamentList = () => {
  const [{ data }] = useQuery<OngoingTournamentsQueryResult>({
    query: ONGOING_TOURNAMENTS_QUERY,
  });

  if (!data?.ongoingTournaments.length) {
    return null;
  }

  return (
    <TournamentBaseList
      tournaments={data?.ongoingTournaments}
      color={colors.darkPurple}
      isLive
    />
  );
};

export const UpcomingTournamentList = ({
  searchQuery,
  filters,
}: StateListProps) => {
  const [{ data }] = useQuery<UpcomingTournamentsQueryResult>({
    query: UPCOMING_TOURNAMENTS_QUERY,
    variables: {
      searchQuery,
      ...filters,
    },
  });

  return <TournamentBaseList tournaments={data?.upcomingTournaments} />;
};

export const PastTournamentList = ({
  searchQuery,
  filters,
}: StateListProps) => {
  const [{ data }] = useQuery<PastTournamentsQueryResult>({
    query: PAST_TOURNAMENTS_QUERY,
    variables: {
      searchQuery,
      ...filters,
    },
  });

  return <TournamentBaseList tournaments={data?.pastTournaments} />;
};
