import { S3_FOLDER_PATH } from "../../../../aws/Constants";
import {
  StyledTournamentImage,
  StyledTournamentInfoContainer,
  StyledTournamentTitle,
} from "../../../../components/TournamentContent/TournamentContent.styled";
import { Stage, Tournament } from "../../../../gql/graphql";
import { StyledHeaderContainer } from "./AdminStageHeader.styled";

interface Props {
  tournament?: Pick<Tournament, "set" | "name">;
  stage?: Pick<Stage, "sequence" | "name" | "startDateTime">;
}

export const toLocaleDateTimeString = (date: Date): string => {
  return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
};

export const AdminStageHeader = ({ stage, tournament }: Props) => {
  return (
    <StyledHeaderContainer>
      <StyledTournamentImage
        src={`${S3_FOLDER_PATH}/sets/${tournament?.set.id}.webp`}
        alt={tournament?.set.name}
      />
      <StyledTournamentInfoContainer>
        <StyledTournamentTitle>{tournament?.name}</StyledTournamentTitle>
        <StyledTournamentTitle>{`Stage #${stage?.sequence} - ${stage?.name}`}</StyledTournamentTitle>
        <p>
          {stage?.startDateTime &&
            toLocaleDateTimeString(new Date(stage.startDateTime))}
        </p>
        <br />
      </StyledTournamentInfoContainer>
    </StyledHeaderContainer>
  );
};
