import { Box } from "@chakra-ui/react";
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
        <StyledPlayerImage url="./milk.png" />
        <StyledInnerBox>
          <StyledPlayerName>@Nickname</StyledPlayerName>
          <StyledPlayerDescription>
            1st Place fhdaisu fhidasu fihudas iufhdas iufhdas iuasdfh usdahf
            aishdf fasudhi iufhdas uifdhsa fiudhsa fiudhsa fhadsiu fhdisua
            iufhdsa ufhds aiufhdas iufhads iuhfasd iufhdsa iufh adsiufh iufdsh
            afsdh adfsuih
          </StyledPlayerDescription>
          <ProTFTButton textColor={colors.white} buttonColor={colors.purple}>
            Profile
          </ProTFTButton>
        </StyledInnerBox>
      </StyledOuterBox>
    </StyledContainer>
  );
};
