import { Box, Text } from "@chakra-ui/react";
import { ProTFTButton } from "../../../components/Button/Button";
import { colors } from "../../../design/colors";
import { StyledPlayerImage } from "../HighlightedPlayer/HighlightedPlayer.styled";
import { BottomCurves, TopCurve } from "./Curves/Curves";
import { StyledContainer } from "./Unknown.styled";

export const Unknown = () => {
  return (
    <StyledContainer>
      <TopCurve />
      <Box
        width="100%"
        backgroundColor={colors.purple}
        display="flex"
        flexDir="column"
        padding="2rem"
        marginTop="-0.1rem"
        marginBottom="-0.1rem"
      >
        <Text>Stats Atuais</Text>

        <Text>Match # f89u2189321</Text>

        <StyledPlayerImage url="./milk.png" />
        <ProTFTButton>Stats completos</ProTFTButton>
      </Box>
      <BottomCurves />
    </StyledContainer>
  );
};
