import { RegionIndicator } from "../../../components/RegionIndicator/RegionIndicator";
import { DateIndicator } from "../../../components/DateIndicator/DateIndicator";
import { TextIconHorizontalContainer } from "../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { PlayersIcon } from "../../../design/icons/Players";
import { colors } from "../../../design/colors";
import { TourneysIcon } from "../../../design/icons/Tourneys";
import { Tournament } from "../../../graphql/schema";
import { formatDate } from "../Tournaments";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useMemo } from "react";
import {
  StyledExtraInfo,
  StyledListItem,
  StyledTournamentExtraInfo,
  StyledTournamentImage,
  StyledTournamentInfoContainer,
  StyledTournamentInfoInnerContainer,
  StyledTournamentSet,
  StyledTournamentTitle,
} from "./TournamentListItem.styled";

interface Props {
  tournament: Tournament;
}

export const TournamentListItem = ({
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
  const formattedRegion = useMemo(() => region?.join(","), [region]);

  return (
    <StyledListItem>
      <StyledTournamentImage src="./background.png" alt="" />
      <StyledTournamentInfoContainer>
        <StyledTournamentSet>{set.name}</StyledTournamentSet>
        <StyledTournamentTitle>{name}</StyledTournamentTitle>
        <br />
        <StyledTournamentInfoInnerContainer>
          <RegionIndicator image="./brazil.png" name={formattedRegion} />
          <StyledTournamentExtraInfo>
            <DateIndicator
              startDate={formatDate(startDate)}
              endDate={formatDate(endDate)}
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
                  <StyledExtraInfo>US${prizePool}</StyledExtraInfo>
                </TextIconHorizontalContainer>
              </>
            )}
          </StyledTournamentExtraInfo>
        </StyledTournamentInfoInnerContainer>
      </StyledTournamentInfoContainer>
    </StyledListItem>
  );
};
