import {
  StyledContainer,
  StyledLink,
  StyledMessage,
  StyledSubMessage,
} from "./NoDataAdded.styled";

export const NoDataAdded = () => {
  return (
    <StyledContainer>
      <StyledMessage>No data added (yet!)</StyledMessage>
      <StyledSubMessage>
        <StyledLink href="/about#WhyNotAdded">Why</StyledLink>?
      </StyledSubMessage>
    </StyledContainer>
  );
};
