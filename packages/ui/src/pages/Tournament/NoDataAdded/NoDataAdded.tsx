import {
  StyledContainer,
  StyledLink,
  StyledMessage,
  StyledSubMessage,
} from "./NoDataAdded.styled";

interface Props {
  tournamentEndDate: string;
}

export const NoDataAdded = ({ tournamentEndDate }: Props) => {
  const endDate = new Date(tournamentEndDate);
  return (
    <StyledContainer>
      <StyledMessage>No data added (yet!)</StyledMessage>
      {endDate < new Date() && (
        <StyledSubMessage>
          <StyledLink href="/about#WhyNotAdded">Why</StyledLink>?
        </StyledSubMessage>
      )}
    </StyledContainer>
  );
};
