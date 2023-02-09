import React from "react";
import { TextIconHorizontalContainer } from "../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { colors } from "../../../design/colors";
import { PlayersIcon } from "../../../design/icons/Players";
import { TourneysIcon } from "../../../design/icons/Tourneys";
import { formatMoney } from "../../../formatter/Money";
import { Tournament } from "../../../graphql/schema";
import { StyledInfoBar, StyledInfoIndicatorText } from "./InfoBar.styled";

type Props = Pick<Tournament, "participantsNumber" | "prizePool" | "currency">;

export const InfoBar = ({ participantsNumber, prizePool, currency }: Props) => {
  return (
    <StyledInfoBar>
      <TextIconHorizontalContainer>
        <PlayersIcon color={colors.purple} />
        <StyledInfoIndicatorText>
          {participantsNumber} players
        </StyledInfoIndicatorText>
      </TextIconHorizontalContainer>
      <TextIconHorizontalContainer>
        <TourneysIcon color={colors.purple} />
        <StyledInfoIndicatorText>
          {formatMoney(currency, prizePool)}
        </StyledInfoIndicatorText>
      </TextIconHorizontalContainer>
    </StyledInfoBar>
  );
};
