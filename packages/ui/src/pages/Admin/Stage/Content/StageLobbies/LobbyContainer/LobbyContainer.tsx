import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { TextIconHorizontalContainer } from "../../../../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { Player } from "../../../../../../graphql/schema";
import { DeleteButton } from "../../../../Components/DeleteButton/DeleteButton";
import { PlayerContent } from "../../../../Components/PlayerItem/PlayerItem";
import {
  StyledTournamentPlayerListSmaller,
  StyledTournamentPlayerListColumn,
  StyledLobbyName,
} from "./LobbyContainer.styled";

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = (prevState: S) => S;

interface DroppableContainerProps {
  content: Player[];
  setContent: Dispatch<SetStateAction<Player[]>>;
  onAdd: (player: Player) => void;
  name: string;
}

export const LobbyContainer = ({
  content,
  setContent,
  onAdd,
  name,
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
    <StyledTournamentPlayerListSmaller
      isComplete={content.length === 8}
      ref={drop}
    >
      <StyledLobbyName>{`Lobby ${name}`}</StyledLobbyName>
      <StyledTournamentPlayerListColumn>
        {content.map((player) => (
          <TextIconHorizontalContainer key={player.id}>
            <PlayerContent key={player.id} player={player} />
            <DeleteButton onClick={removePlayer(player.id)} />
          </TextIconHorizontalContainer>
        ))}
      </StyledTournamentPlayerListColumn>
    </StyledTournamentPlayerListSmaller>
  );
};
