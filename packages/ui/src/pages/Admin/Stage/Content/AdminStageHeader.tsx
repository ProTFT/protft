import {
  StyledTournamentImage,
  StyledTournamentInfoContainer,
  StyledTournamentTitle,
} from "../../../../components/TournamentContent/TournamentContent.styled";
import { Stage, Tournament } from "../../../../graphql/schema";
import { StyledHeaderContainer } from "./AdminStageHeader.styled";

interface Props {
  tournament?: Tournament;
  stage?: Stage;
}

export const AdminStageHeader = ({ stage, tournament }: Props) => {
  return (
    <StyledHeaderContainer>
      <StyledTournamentImage
        src={`/sets/${tournament?.set.id}.webp`}
        alt={tournament?.set.name}
      />
      <StyledTournamentInfoContainer>
        <StyledTournamentTitle>{tournament?.name}</StyledTournamentTitle>
        <StyledTournamentTitle>{`Stage #${stage?.sequence} - ${stage?.name}`}</StyledTournamentTitle>
        <br />
      </StyledTournamentInfoContainer>
    </StyledHeaderContainer>
  );
};
