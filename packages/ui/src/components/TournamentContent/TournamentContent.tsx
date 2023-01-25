import React, { useMemo } from "react";
import { colors } from "../../design/colors";
import { PlayersIcon } from "../../design/icons/Players";
import { TourneysIcon } from "../../design/icons/Tourneys";
import { formatMoney } from "../../formatter/Money";
import { Tournament } from "../../graphql/schema";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { useIsMobile } from "../../hooks/useIsMobile";
import { DateIndicator } from "../DateIndicator/DateIndicator";
import { TextIconHorizontalContainer } from "../Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { RegionsIndicator } from "../RegionIndicator/RegionIndicator";
import {
  StyledExtraInfo,
  StyledRegionDateContainer,
  StyledTitleContainer,
  StyledTournamentExtraInfo,
  StyledTournamentImage,
  StyledTournamentInfoContainer,
  StyledTournamentInfoInnerContainer,
  StyledTournamentSet,
  StyledTournamentTitle,
} from "./TournamentContent.styled";

interface Props {
  tournament: Tournament;
}

export const TournamentContent = ({
  tournament: {
    set,
    name,
    startDate,
    endDate,
    participantsNumber,
    prizePool,
    region,
    currency,
  },
}: Props) => {
  const isDesktop = useIsDesktop();
  const formattedPrizePool = useMemo(
    () => formatMoney(currency, prizePool),
    [currency, prizePool]
  );

  return (
    <>
      <StyledTournamentImage src={`/sets/${set.id}.webp`} alt={set.name} />
      <StyledTournamentInfoContainer>
        <StyledTitleContainer>
          <StyledTournamentSet>{set.name}</StyledTournamentSet>
          <StyledTournamentTitle>{name}</StyledTournamentTitle>
        </StyledTitleContainer>
        <StyledTournamentInfoInnerContainer>
          <StyledRegionDateContainer>
            <RegionsIndicator regionCodes={region!} />
            <DateIndicator startDate={startDate} endDate={endDate} />
          </StyledRegionDateContainer>
          {isDesktop && (
            <StyledRegionDateContainer>
              <TextIconHorizontalContainer>
                <PlayersIcon color={colors.purple} />
                <StyledExtraInfo>{participantsNumber} players</StyledExtraInfo>
              </TextIconHorizontalContainer>
              <TextIconHorizontalContainer>
                <TourneysIcon color={colors.purple} />
                <StyledExtraInfo>{formattedPrizePool}</StyledExtraInfo>
              </TextIconHorizontalContainer>
            </StyledRegionDateContainer>
          )}
        </StyledTournamentInfoInnerContainer>
      </StyledTournamentInfoContainer>
    </>
  );
};
