import { Link } from "react-router-dom";
import { ProTFTButton } from "../../../components/Button/Button";
import { colors } from "../../../design/colors";
import {
  StyledContainer,
  StyledInnerBox,
  StyledOuterBox,
  StyledPlayerDescription,
  StyledPlayerImage,
  StyledPlayerName,
  StyledSectionTitle,
} from "./HighlightedPlayer.styled";

export const HighlightedPlayer = () => {
  return (
    <StyledContainer>
      <StyledSectionTitle>Highlighted Player</StyledSectionTitle>
      <StyledOuterBox>
        <StyledPlayerImage url="/souless.jpeg" />
        <StyledInnerBox>
          <StyledPlayerName>TSM Souless</StyledPlayerName>
          <StyledPlayerDescription>
            After clutching out the first place at TFT Summit together with{" "}
            <Link to={"/players/31"}>Kurumx</Link>, Souless puts himself in an
            amazing position at the beginning of the set.
            <br />
            <br />
            After questions raised about his flexibility, he showed several
            different comps and boasts amazing stats for the event.
          </StyledPlayerDescription>
          <Link to={`/players/152`}>
            <ProTFTButton textColor={colors.white} buttonColor={colors.purple}>
              Profile
            </ProTFTButton>
          </Link>
        </StyledInnerBox>
      </StyledOuterBox>
    </StyledContainer>
  );
};
