import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { StyledContainer, StyledTournamentList } from "./Tournaments.styled";
import { TournamentsQueryResult, TOURNAMENTS_QUERY } from "./queries";
import { StyledSearchFilterBar } from "../../components/SearchFilterBar/SearchFilterBar";
import { TournamentListItem } from "./TournamentListItem/TournamentListItem";

export const formatDate = (stringDate: string) =>
  new Date(stringDate).toLocaleDateString();

export const Tournaments = () => {
  const [{ data }] = useQuery<TournamentsQueryResult>({
    query: TOURNAMENTS_QUERY,
  });

  useDocumentTitle("Tourneys");

  return (
    <StyledContainer>
      <StyledSearchFilterBar />
      <StyledTournamentList>
        {data?.tournaments.map((tournament) => (
          <Link to={`${tournament.id}`}>
            <TournamentListItem tournament={tournament} />
          </Link>
        ))}
      </StyledTournamentList>
    </StyledContainer>
  );
};
