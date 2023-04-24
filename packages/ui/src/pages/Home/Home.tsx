import { HighlightedTournaments } from "./HighlightedTournaments/HighlightedTournaments";
import { HighlightedPlayer } from "./HighlightedPlayer/HighlightedPlayer";
import { About } from "./About/About";
import { StyledContainer } from "./Home.styled";
import { Helmet } from "react-helmet";

export const Home = () => {
  return (
    <StyledContainer>
      <Helmet>
        <title>ProTFT</title>
      </Helmet>
      <HighlightedTournaments />
      <HighlightedPlayer />
      <About />
    </StyledContainer>
  );
};
