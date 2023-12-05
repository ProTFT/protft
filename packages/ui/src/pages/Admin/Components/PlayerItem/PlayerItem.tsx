import { useDrag } from "react-dnd";
import { TextIconHorizontalContainer } from "../../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { RegionsIndicator } from "../../../../components/RegionIndicator/RegionIndicator";
import { Player } from "../../../../graphql/schema";
import {
  StyledPlayerContentContainer,
  StyledPlayerName,
} from "./PlayerItem.styled";

export const PlayerContent = ({
  player: { region, name },
}: {
  player: Player;
}) => {
  return (
    <StyledPlayerContentContainer>
      <RegionsIndicator regionCodes={[region!]} showName={false} />
      <StyledPlayerName>{name}</StyledPlayerName>
    </StyledPlayerContentContainer>
  );
};

interface DragAndDropPlayerProps {
  player: Player;
  onClick?: () => void;
}

export const DraggablePlayer = ({
  player,
  onClick = () => {},
}: DragAndDropPlayerProps) => {
  const [, drag] = useDrag(() => ({
    type: "Player",
    item: player,
    collect: (monitor) => ({
      isDragging: monitor.isDragging,
    }),
  }));
  return (
    <TextIconHorizontalContainer onClick={onClick} ref={drag}>
      <PlayerContent player={player} />
    </TextIconHorizontalContainer>
  );
};
