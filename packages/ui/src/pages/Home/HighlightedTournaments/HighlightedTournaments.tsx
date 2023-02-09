import { Logo } from "../../../components/Logo/Logo";
import {
  StyledContainer,
  StyledTournamentTitle,
} from "./HighlightedTournaments.styled";
import { ProTFTButton } from "../../../components/Button/Button";
import { Link } from "react-router-dom";

export const HighlightedTournaments = () => {
  return (
    <StyledContainer>
      <Logo width={150} height={83} />
      <StyledTournamentTitle>Jade Cup</StyledTournamentTitle>
      <Link to={"/tournaments/dragonlands-na-jade-cup"}>
        <ProTFTButton>Check out</ProTFTButton>
      </Link>
    </StyledContainer>
  );
};
