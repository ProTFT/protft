import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { TournamentsQueryResult, TOURNAMENTS_QUERY } from "../queries";
import { TournamentListItem } from "../TournamentListItem/TournamentListItem";
import { StyledTournamentList } from "../Tournaments.styled";

interface Props {
  searchQuery: string;
}

export const TournamentList = ({ searchQuery }: Props) => {
  const [{ data }] = useQuery<TournamentsQueryResult>({
    query: TOURNAMENTS_QUERY,
    variables: {
      searchQuery,
    },
  });

  return (
    <StyledTournamentList>
      {data?.tournaments.map((tournament) => (
        <Link key={tournament.id} to={`${tournament.id}`}>
          <TournamentListItem tournament={tournament} />
        </Link>
      ))}
    </StyledTournamentList>
  );
};
