import {
  CountryIndicator,
  RegionsIndicator,
} from "../../../components/RegionIndicator/RegionIndicator";
// import { colors } from "../../../design/colors";
// import { Twitter } from "../../../design/icons/Twitter";
import { Player } from "../../../graphql/schema";
import {
  StyledHeaderContainer,
  StyledPlayerImage,
  StyledPlayerInfo,
  StyledPlayerName,
  StyledSocialMediaContainer,
} from "./Header.styled";

interface Props {
  player?: Pick<Player, "name" | "region" | "country">;
}

export const Header = ({ player }: Props) => {
  return (
    <StyledHeaderContainer>
      <StyledPlayerImage />
      <StyledPlayerInfo>
        <StyledPlayerName>{player?.name}</StyledPlayerName>
        <RegionsIndicator regionCodes={[player?.region || ""]} />
        <CountryIndicator countryCode={player?.country} showName />
        <StyledSocialMediaContainer>
          {/* <Twitter color={colors.white} onClick={() => {}} size={24} /> */}
        </StyledSocialMediaContainer>
      </StyledPlayerInfo>
    </StyledHeaderContainer>
  );
};
