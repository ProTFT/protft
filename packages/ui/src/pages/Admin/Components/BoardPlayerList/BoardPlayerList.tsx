import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { Player } from "../../../../graphql/schema";
import { DroppableContainer } from "../DroppableContainer/DroppableContainer";
import { StyledTitle } from "../Title/Title.styled";
import {
  BoardListBody,
  BoardListButtons,
  BoardListContainer,
  BoardListHeader,
} from "./BoardPlayerList.styled";

interface Props {
  title: string;
  onAddPlayer: (player: Player) => void;
  players: Player[] | undefined;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  editable?: boolean;
  onEditClick?: (player: Player) => Promise<void>;
}

export const BoardPlayerList = ({
  title,
  players = [],
  setPlayers,
  onAddPlayer,
  children,
  editable = false,
  onEditClick,
}: PropsWithChildren<Props>) => {
  return (
    <BoardListContainer>
      <BoardListHeader>
        <StyledTitle>{title}</StyledTitle>
        <BoardListButtons>{children}</BoardListButtons>
      </BoardListHeader>
      <BoardListBody>
        <DroppableContainer
          editable={editable}
          content={players}
          setContent={setPlayers}
          onAdd={onAddPlayer}
          onEditClick={onEditClick}
        />
      </BoardListBody>
    </BoardListContainer>
  );
};
