import { useMemo } from "react";
import {
  CountryIndicator,
  RegionsIndicator,
} from "../../../components/RegionIndicator/RegionIndicator";
import { Player } from "../../../graphql/schema";
import {
  PlayerAlias,
  StyledHeaderContainer,
  StyledPlayerImage,
  StyledPlayerInfo,
  StyledPlayerName,
} from "./Header.styled";
import { SocialMedia } from "./SocialMedia";

interface Props {
  player?: Pick<Player, "id" | "name" | "region" | "country" | "alias">;
}

export const Header = ({ player }: Props) => {
  const formattedAlias = useMemo(
    () => player?.alias.join(", "),
    [player?.alias]
  );
  return (
    <StyledHeaderContainer>
      <StyledPlayerImage />
      <StyledPlayerInfo>
        <StyledPlayerName>{player?.name}</StyledPlayerName>
        {Boolean(player?.alias.length) && (
          <PlayerAlias>AKA: {formattedAlias}</PlayerAlias>
        )}
        <RegionsIndicator regionCodes={[player?.region || ""]} />
        <CountryIndicator countryCode={player?.country} showName />
        <SocialMedia id={player?.id} />
      </StyledPlayerInfo>
    </StyledHeaderContainer>
  );
};
