import {
  StyledTournamentExtraInfo,
  StyledTournamentInfoContainer,
  StyledTournamentInfoInnerContainer,
} from "./TournamentContent.styled";

export const TournamentContentSkeleton = () => {
  return (
    <>
      <StyledTournamentInfoContainer>
        <br />
        <StyledTournamentInfoInnerContainer>
          <StyledTournamentExtraInfo></StyledTournamentExtraInfo>
        </StyledTournamentInfoInnerContainer>
      </StyledTournamentInfoContainer>
    </>
  );
};
