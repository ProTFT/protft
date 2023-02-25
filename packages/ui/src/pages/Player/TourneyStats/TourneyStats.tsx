import { TournamentsPlayed } from "../../../graphql/schema";
import { TournamentBaseList } from "../../Tournaments/TournamentList/TournamentBaseList";
import {
  StyledTourneyStatsContainer,
  StyledTitle,
} from "./TourneyStats.styled";

interface Props {
  tournaments?: TournamentsPlayed[];
}

export const TourneyStats = ({ tournaments }: Props) => {
  return (
    <StyledTourneyStatsContainer>
      <StyledTitle>Tourney appearances</StyledTitle>
      <TournamentBaseList tournaments={tournaments} />
    </StyledTourneyStatsContainer>
  );
};
