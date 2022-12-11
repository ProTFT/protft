import React from "react";
import { Logo } from "../../../components/Logo/Logo";
import {
  StyledContainer,
  StyledTournamentTitle,
} from "./HighlightedTournaments.styled";
import { ProTFTButton } from "../../../components/Button/Button";

export const HighlightedTournaments = () => {
  return (
    <StyledContainer>
      <Logo width={150} height={83} />
      <StyledTournamentTitle>Jade Cup</StyledTournamentTitle>
      <ProTFTButton>Check out</ProTFTButton>
    </StyledContainer>
  );
};
