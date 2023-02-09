import { PlayerCardSkeleton } from "../PlayerCard/PlayerCard.skeleton";
import { StyledPlayersList } from "../Players.styled";

export const PlayersListSkeleton = () => {
  return (
    <StyledPlayersList>
      {new Array(20).fill(1).map((_, index) => (
        <PlayerCardSkeleton key={index} />
      ))}
    </StyledPlayersList>
  );
};
