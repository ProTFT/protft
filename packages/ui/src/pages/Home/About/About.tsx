import { Box, Text } from "@chakra-ui/react";
import { colors } from "../../../design/colors";
import { StyledContainer } from "./About.styled";

export const About = () => {
  return (
    <StyledContainer>
      <Text
        fontFamily="VTF Redzone Classic"
        fontWeight="400"
        fontSize="32px"
        lineHeight="24px"
        letterSpacing="0.25em"
        textTransform="uppercase"
        textColor={colors.yellow}
      >
        About
      </Text>
      <Text
        fontFamily="VTF Redzone Classic"
        fontWeight="400"
        fontSize="64px"
        lineHeight="24px"
        letterSpacing="0.25em"
        textTransform="uppercase"
        textColor={colors.yellow}
      >
        Pro TFT
      </Text>
      <Text
        fontFamily="Roboto"
        fontWeight="400"
        fontSize="24px"
        lineHeight="38px"
        letterSpacing="0.25em"
        textColor={colors.white}
      >
        A hub for TFT esports
      </Text>
      <button style={{ backgroundColor: colors.yellow, padding: "8px 26px" }}>
        <Text
          fontFamily="Roboto"
          fontWeight="800"
          size="10px"
          lineHeight="24px"
          letterSpacing="0.25em"
          textColor={colors.pitchBlack}
          textTransform="uppercase"
        >
          See our history
        </Text>
      </button>
    </StyledContainer>
  );
};
