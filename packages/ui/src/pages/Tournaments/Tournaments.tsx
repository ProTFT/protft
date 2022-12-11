import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import {
  StyledContainer,
  StyledDateText,
  StyledTournamentInfoInnerContainer,
  StyledListItem,
  StyledRegionText,
  StyledSearchInput,
  StyledTournamentImage,
  StyledTournamentInfoContainer,
  StyledTournamentTitle,
  StyledHorizontalContainer,
} from "./Tournaments.styled";

export const Tournaments = () => {
  // const [{ data }] = useQuery<TournamentsQueryResult>({
  //   query: TOURNAMENTS_QUERY,
  // });
  const data = {
    tournaments: [
      { id: 1, name: "alala", participantsNumber: 10, prizePool: 10000 },
      { id: 2, name: "afdasfsa", participantsNumber: 10, prizePool: 10000 },
      { id: 3, name: "fdsjaifja", participantsNumber: 10, prizePool: 10000 },
      { id: 4, name: "fdhasiu", participantsNumber: 10, prizePool: 10000 },
      { id: 5, name: "fdsaufha", participantsNumber: 10, prizePool: 10000 },
    ],
  };
  useDocumentTitle("ProTFT");

  return (
    <StyledContainer>
      <StyledSearchInput placeholder="Search events" />
      {data.tournaments.map((tournament) => (
        <Link to={`${tournament.id}`}>
          <StyledListItem>
            <StyledTournamentImage src="./background.png" alt="" />
            <StyledTournamentInfoContainer>
              <StyledTournamentTitle>Terras Dracônicas</StyledTournamentTitle>
              <br />
              <StyledTournamentInfoInnerContainer>
                <StyledHorizontalContainer>
                  <img src="./brazil.png" alt="brasil" />
                  <StyledRegionText>Brazil</StyledRegionText>
                </StyledHorizontalContainer>
                <StyledHorizontalContainer>
                  <img src="./calendar.png" alt="calendar" />
                  <StyledDateText>12/10/22 - 15/10/22</StyledDateText>
                </StyledHorizontalContainer>
              </StyledTournamentInfoInnerContainer>
            </StyledTournamentInfoContainer>
          </StyledListItem>
        </Link>
      ))}
    </StyledContainer>
  );
};
