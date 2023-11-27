import { ChangeEvent, useMemo } from "react";
import { ProTFTButton } from "../../../../components/Button/Button";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { Player } from "../../../../graphql/schema";
import { DraggablePlayer } from "../PlayerItem/PlayerItem";
import {
  SearchListBody,
  SearchListContainer,
  SearchListEntry,
  SearchListHeader,
} from "./PlayerSearchList.styled";

interface Props {
  onChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickButton?: () => void;
  onClickPlayer?: (player: Player) => void;
  showButton: boolean;
  buttonText?: string;
  players: Player[] | undefined | null;
}

export const PlayerSearchList = ({
  showButton,
  buttonText,
  onChangeSearch,
  onClickButton,
  players,
  onClickPlayer,
}: Props) => {
  const handleClickPlayer = useMemo(() => {
    if (!onClickPlayer) {
      return () => {};
    }
    return onClickPlayer;
  }, [onClickPlayer]);
  return (
    <SearchListContainer>
      <SearchListHeader>
        <SearchInput placeholder="Search players" onChange={onChangeSearch} />
        {showButton && (
          <ProTFTButton onClick={onClickButton}>{buttonText}</ProTFTButton>
        )}
      </SearchListHeader>
      <SearchListBody>
        {players?.map((player) => (
          <SearchListEntry key={player.id}>
            <DraggablePlayer
              player={player}
              onClick={() => handleClickPlayer(player)}
            />
          </SearchListEntry>
        ))}
      </SearchListBody>
    </SearchListContainer>
  );
};
