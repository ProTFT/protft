// import { HighlightedTournaments } from "./HighlightedTournaments/HighlightedTournaments";
// import { HighlightedPlayer } from "./HighlightedPlayer/HighlightedPlayer";
// import { About } from "./About/About";
// import { StyledContainer } from "./Home.styled";
// import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";

export const Home = () => {
  return <Navigate to={"/tournaments"} />;
  // return (
  //   <StyledContainer>
  //     <Helmet>
  //       <title>ProTFT</title>
  //     </Helmet>
  //     <HighlightedTournaments />
  //     <HighlightedPlayer />
  //     <About />
  //   </StyledContainer>
  // );
};
