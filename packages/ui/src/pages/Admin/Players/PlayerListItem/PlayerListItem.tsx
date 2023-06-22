import { RegionsIndicator } from "../../../../components/RegionIndicator/RegionIndicator";
import { Player } from "../../../../graphql/schema";
import { StyledContainer, StyledText } from "./PlayerListItem.styled";

interface Props {
  player: Player;
}

export const PlayerListItem = ({ player }: Props) => {
  return (
    <StyledContainer>
      <StyledText>{`${player.id} - ${player.name}`}</StyledText>
      <RegionsIndicator regionCodes={[player.region!]} />
      <StyledText>{player.country}</StyledText>
    </StyledContainer>
  );
};
