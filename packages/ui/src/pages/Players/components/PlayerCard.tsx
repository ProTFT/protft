import React from "react";
import { Link } from "react-router-dom";
import { RoundedContainer } from "../../../components/Containers/RoundedContainer/RoundedContainer";
import { RegionsIndicator } from "../../../components/RegionIndicator/RegionIndicator";
import { ArrowRightIcon } from "../../../design/icons/ArrowRight";
import { Player } from "../../../graphql/schema";
import { useIsDesktop } from "../../../hooks/useIsDesktop";
import {
  StyledDetailsButton,
  StyledPlayerCardBottom,
  StyledPlayerCardHeader,
  StyledPlayerImage,
  StyledPlayerInfo,
  StyledPlayerName,
} from "./PlayerCard.styled";

const PlayerCardStats = React.lazy(() =>
  import("./PlayerStats").then((m) => ({
    default: m.PlayerCardStats,
  }))
);

interface Props {
  player: Player;
}

export const PlayerCard = ({
  player: { name, region, playerStats, slug },
}: Props) => {
  const isDesktop = useIsDesktop();

  return (
    <Link to={`${slug}`}>
      <RoundedContainer padding="1.5rem">
        <StyledPlayerCardHeader>
          <StyledPlayerImage />
          <StyledPlayerInfo>
            <StyledPlayerName>{name}</StyledPlayerName>
            <RegionsIndicator regionCodes={[region!]} />
          </StyledPlayerInfo>
        </StyledPlayerCardHeader>
        {isDesktop && <PlayerCardStats playerStats={playerStats} />}
        <StyledPlayerCardBottom>
          <StyledDetailsButton>Details</StyledDetailsButton>
          <ArrowRightIcon size={20} onClick={() => {}} />
        </StyledPlayerCardBottom>
      </RoundedContainer>
    </Link>
  );
};
