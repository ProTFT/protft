import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { colors } from "../../../design/colors";
import { Tournament } from "../../../graphql/schema";
import {
  OngoingTournamentsQueryResult,
  ONGOING_TOURNAMENTS_QUERY,
  PastTournamentsQueryResult,
  PAST_TOURNAMENTS_QUERY,
  UpcomingTournamentsQueryResult,
  UPCOMING_TOURNAMENTS_QUERY,
} from "../queries";
import { TournamentListItem } from "../TournamentListItem/TournamentListItem";
import { Tabs } from "../Tournaments";
import { StyledTournamentList } from "../Tournaments.styled";

interface StateListProps {
  searchQuery: string;
}

export const OngoingTournamentList = () => {
  const [{ data }] = useQuery<OngoingTournamentsQueryResult>({
    query: ONGOING_TOURNAMENTS_QUERY,
  });

  return (
    <StyledTournamentList>
      {data?.ongoingTournaments.map((tournament) => (
        <Link key={tournament.id} to={`${tournament.slug}`}>
          <TournamentListItem
            tournament={tournament}
            color={colors.darkPurple}
            isLive
          />
        </Link>
      ))}
    </StyledTournamentList>
  );
};

export const UpcomingTournamentList = ({ searchQuery }: StateListProps) => {
  const [{ data }] = useQuery<UpcomingTournamentsQueryResult>({
    query: UPCOMING_TOURNAMENTS_QUERY,
    variables: {
      searchQuery,
    },
  });

  return <TournamentBaseList tournaments={data?.upcomingTournaments} />;
};

export const PastTournamentList = ({ searchQuery }: StateListProps) => {
  const [{ data }] = useQuery<PastTournamentsQueryResult>({
    query: PAST_TOURNAMENTS_QUERY,
    variables: {
      searchQuery,
    },
  });

  return <TournamentBaseList tournaments={data?.pastTournaments} />;
};

interface BaseListProps {
  searchQuery?: string;
  tournaments: Tournament[] | undefined;
}

export const TournamentBaseList = ({ tournaments }: BaseListProps) => {
  return (
    <StyledTournamentList>
      {tournaments?.map((tournament) => (
        <Link key={tournament.id} to={`${tournament.slug}`}>
          <TournamentListItem tournament={tournament} />
        </Link>
      ))}
    </StyledTournamentList>
  );
};

interface Props {
  searchQuery: string;
  selected: Tabs;
}

export const TournamentList = ({ searchQuery, selected }: Props) => {
  return selected === Tabs.Upcoming ? (
    <UpcomingTournamentList searchQuery={searchQuery} />
  ) : (
    <PastTournamentList searchQuery={searchQuery} />
  );
};
