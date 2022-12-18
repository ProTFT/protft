import { Link } from "react-router-dom";
import { RoundedContainer } from "../../../components/Containers/RoundedContainer/RoundedContainer";
import { RegionIndicator } from "../../../components/RegionIndicator/RegionIndicator";
import { ArrowRightIcon } from "../../../design/icons/ArrowRight";
import {
  StyledDetailsButton,
  StyledPlayerCardBottom,
  StyledPlayerCardHeader,
  StyledPlayerImage,
  StyledPlayerInfo,
  StyledPlayerName,
} from "./PlayerCard.styled";

export const PlayerCard = () => {
  return (
    <Link to={"1"}>
      <RoundedContainer>
        <StyledPlayerCardHeader>
          <StyledPlayerImage />
          <StyledPlayerInfo>
            <StyledPlayerName>K3SOJU</StyledPlayerName>
            <RegionIndicator image="/brazil.png" name="Brazil" />
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
