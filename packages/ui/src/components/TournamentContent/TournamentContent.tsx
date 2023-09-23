import React, { useMemo } from "react";
import { S3_FOLDER_PATH } from "../../aws/Constants";
import { colors } from "../../design/colors";
import { PlayersIcon } from "../../design/icons/Players";
import { TourneysIcon } from "../../design/icons/Tourneys";
import { formatMoney } from "../../formatter/Money";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { TournamentWithMaybePlayerResult } from "../../pages/Tournaments/Tournaments.types";
import { DateIndicator } from "../DateIndicator/DateIndicator";
import { TextIconHorizontalContainer } from "../Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { RegionsIndicator } from "../RegionIndicator/RegionIndicator";
import { OngoingTournamentTimeIndicator } from "./OngoingTournamentTimeIndicator";
import {
  StyledExtraInfo,
  StyledPlayerPosition,
  StyledPlayerPositionContainer,
  StyledRegionDateContainer,
  StyledTitleContainer,
  StyledTournamentImage,
  StyledTournamentInfoContainer,
  StyledTournamentInfoInnerContainer,
  StyledTournamentSet,
  StyledTournamentTitle,
} from "./TournamentContent.styled";

interface Props {
  tournament: TournamentWithMaybePlayerResult;
  isOngoing?: boolean;
}

interface PositionLabelProps {
  position: string;
}

const PlayerPositionLabel = ({ position }: PositionLabelProps) => {
  return (
    <StyledPlayerPositionContainer position={position}>
      <StyledPlayerPosition>{position}</StyledPlayerPosition>
    </StyledPlayerPositionContainer>
  );
};

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
    finalPosition,
    nextStartTime,
  },
  isOngoing = false,
}: Props) => {
  const isDesktop = useIsDesktop();
  const formattedPrizePool = useMemo(
    () => formatMoney(currency, prizePool),
    [currency, prizePool]
  );

  return (
    <>
      <StyledTournamentImage
        src={`${S3_FOLDER_PATH}/sets/${set.id}.webp`}
        alt={set.name}
      />
      <StyledTournamentInfoContainer>
        <StyledTitleContainer>
          <StyledTournamentSet>{set.name}</StyledTournamentSet>
          <StyledTournamentTitle>{name}</StyledTournamentTitle>
        </StyledTitleContainer>
        {isOngoing && (
          <OngoingTournamentTimeIndicator nextStartTime={nextStartTime} />
        )}
        {/* {nextStartTime && nextStartTime} */}
        {finalPosition && <PlayerPositionLabel position={finalPosition} />}
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
