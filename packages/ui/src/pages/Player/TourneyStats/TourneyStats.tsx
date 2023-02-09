import { Tournament } from "../../../graphql/schema";
import { TournamentBaseList } from "../../Tournaments/TournamentList/TournamentBaseList";
import {
  StyledTourneyStatsContainer,
  StyledTitle,
} from "./TourneyStats.styled";

interface Props {
  tournaments?: Pick<
    Tournament,
    "slug" | "id" | "set" | "name" | "region" | "startDate" | "endDate"
  >[];
}

export const TourneyStats = ({ tournaments }: Props) => {
  return (
    <StyledTourneyStatsContainer>
      <StyledTitle>Tourney appearances</StyledTitle>
      <TournamentBaseList tournaments={tournaments as Tournament[]} />
    </StyledTourneyStatsContainer>
  );
};
