import { Link } from "react-router-dom";
import { RoundedContainer } from "../../../components/Containers/RoundedContainer/RoundedContainer";
import {
  CountryIndicator,
  RegionsIndicator,
} from "../../../components/RegionIndicator/RegionIndicator";
import { ArrowRightIcon } from "../../../design/icons/ArrowRight";
import { Player } from "../../../graphql/schema";
import {
  StyledDetailsButton,
  StyledPlayerCardBottom,
  StyledPlayerCardHeader,
  StyledPlayerImage,
  StyledPlayerInfo,
  StyledPlayerName,
} from "./PlayerCard.styled";

interface Props {
  player: Player;
}

export const PlayerCard = ({
  player: { name, region, slug, country },
}: Props) => {
  return (
    <Link to={`${slug}`}>
      <RoundedContainer padding="1.5rem">
        <StyledPlayerCardHeader>
          <StyledPlayerImage />
          <StyledPlayerInfo>
            <StyledPlayerName>{name}</StyledPlayerName>
            <RegionsIndicator regionCodes={[region!]} />
            <CountryIndicator countryCode={country} showName />
          </StyledPlayerInfo>
        </StyledPlayerCardHeader>
        <StyledPlayerCardBottom>
          <StyledDetailsButton>Details</StyledDetailsButton>
          <ArrowRightIcon size={20} onClick={() => {}} />
        </StyledPlayerCardBottom>
      </RoundedContainer>
    </Link>
  );
};
