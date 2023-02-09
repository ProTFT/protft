import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { TextIconHorizontalContainer } from "../../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { Player } from "../../../../graphql/schema";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { PlayerContent } from "../PlayerItem/PlayerItem";
import {
  StyledTournamentPlayerList,
  StyledTournamentPlayerListColumn,
} from "./DroppableContainer.styled";

interface DroppableContainerProps {
  content: Player[];
  setContent: React.Dispatch<React.SetStateAction<Player[]>>;
  onAdd: (player: Player) => void;
}

export const DroppableContainer = ({
  content,
  setContent,
  onAdd,
}: DroppableContainerProps) => {
  const [, drop] = useDrop<Player>(() => ({
    accept: "Player",
    drop(player) {
      onAdd(player);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const removePlayer = useCallback(
    (id: number) => () => {
      setContent((players) => players.filter((p) => p.id !== id));
    },
    [setContent]
  );

  return (
    <StyledTournamentPlayerList ref={drop}>
      <StyledTournamentPlayerListColumn>
        {content.map((player) => (
          <TextIconHorizontalContainer key={player.id}>
            <PlayerContent key={player.id} player={player} />
            <DeleteButton onClick={removePlayer(player.id)} />
          </TextIconHorizontalContainer>
        ))}
      </StyledTournamentPlayerListColumn>
    </StyledTournamentPlayerList>
  );
};
