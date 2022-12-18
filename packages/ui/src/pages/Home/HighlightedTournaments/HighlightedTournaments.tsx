import React from "react";
import { Logo } from "../../../components/Logo/Logo";
import {
  StyledContainer,
  StyledTournamentTitle,
} from "./HighlightedTournaments.styled";
import { ProTFTButton } from "../../../components/Button/Button";
import { colors } from "../../../design/colors";

export const HighlightedTournaments = () => {
  return (
    <StyledContainer>
      <Logo width={150} height={83} />
      <StyledTournamentTitle>Jade Cup</StyledTournamentTitle>
      <ProTFTButton textColor={colors.otherBlack}>Check out</ProTFTButton>
    </StyledContainer>
  );
};
