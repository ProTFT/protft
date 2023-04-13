import { useRef } from "react";
import { useQuery } from "urql";
import { useObserver } from "../../../hooks/useObserver";
import { Pagination } from "../../../hooks/usePagination";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import { StyledPlayersList } from "../Players.styled";
import {
  PlayersQueryResult,
  PlayersQueryVariables,
  PLAYERS_QUERY,
} from "../queries";

interface Props {
  searchQuery: string;
  pagination: Pagination;
  onLoadMore: () => void;
}

export const PlayersList = ({ searchQuery, pagination, onLoadMore }: Props) => {
  const [{ data }] = useQuery<PlayersQueryResult, PlayersQueryVariables>({
    query: PLAYERS_QUERY,
    variables: { searchQuery, ...pagination },
  });
  const bottomRef = useRef<HTMLDivElement>(null);

  useObserver(bottomRef, onLoadMore);

  return (
    <StyledPlayersList>
      {data?.players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
      <div ref={bottomRef} />
    </StyledPlayersList>
  );
};
