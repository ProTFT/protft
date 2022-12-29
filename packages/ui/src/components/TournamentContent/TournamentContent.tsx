import React, { useMemo } from "react";
import { colors } from "../../design/colors";
import { PlayersIcon } from "../../design/icons/Players";
import { TourneysIcon } from "../../design/icons/Tourneys";
import { formatDateFromDB } from "../../formatter/Date";
import { formatMoney } from "../../formatter/Money";
import { Tournament } from "../../graphql/schema";
import { useIsMobile } from "../../hooks/useIsMobile";
import { DateIndicator } from "../DateIndicator/DateIndicator";
import { TextIconHorizontalContainer } from "../Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { RegionsIndicator } from "../RegionIndicator/RegionIndicator";
import {
  StyledExtraInfo,
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
  },
}: Props) => {
  const isMobile = useIsMobile();
  const formattedStartDate = useMemo(
    () => formatDateFromDB(startDate),
    [startDate]
  );
  const formattedEndDate = useMemo(() => formatDateFromDB(endDate), [endDate]);
  const formattedPrizePool = useMemo(
    () => formatMoney("USD", prizePool),
    [prizePool]
  );

  return (
    <>
      <StyledTournamentImage src={`/sets/${set.id}.webp`} alt={set.name} />
      <StyledTournamentInfoContainer>
        <StyledTournamentSet>{set.name}</StyledTournamentSet>
        <StyledTournamentTitle>{name}</StyledTournamentTitle>
        <br />
        <StyledTournamentInfoInnerContainer>
          <RegionsIndicator regionCodes={region!} />
          <StyledTournamentExtraInfo>
            <DateIndicator
              startDate={formattedStartDate}
              endDate={formattedEndDate}
            />
            {!isMobile && (
              <>
                <TextIconHorizontalContainer>
                  <PlayersIcon color={colors.purple} />
                  <StyledExtraInfo>
                    {participantsNumber} players
                  </StyledExtraInfo>
                </TextIconHorizontalContainer>
                <TextIconHorizontalContainer>
                  <TourneysIcon color={colors.purple} />
                  <StyledExtraInfo>{formattedPrizePool}</StyledExtraInfo>
                </TextIconHorizontalContainer>
              </>
            )}
          </StyledTournamentExtraInfo>
        </StyledTournamentInfoInnerContainer>
      </StyledTournamentInfoContainer>
    </>
  );
};
