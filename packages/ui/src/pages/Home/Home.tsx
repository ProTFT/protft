import { HighlightedTournaments } from "./HighlightedTournaments/HighlightedTournaments";
import { HighlightedPlayer } from "./HighlightedPlayer/HighlightedPlayer";
import { About } from "./About/About";
// import { Unknown } from "./Unknown/Unknown";
import { StyledContainer } from "./Home.styled";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Home = () => {
  useDocumentTitle("ProTFT");

  return (
    <StyledContainer>
      <HighlightedTournaments />
      <HighlightedPlayer />
      {/* <Unknown /> */}
      <About />
    </StyledContainer>
  );
};
