import { useCallback } from "react";
import { useQuery } from "urql";
import { PlayerListItem } from "../PlayerListItem/PlayerListItem";
import { PlayersQueryResult, PLAYERS_ADMIN_QUERY } from "../queries";
import { StyledPlayerList } from "./PlayerList.styled";

interface Props {
  searchQuery: string;
}

export const PlayerList = ({ searchQuery }: Props) => {
  const [{ data }, refetch] = useQuery<PlayersQueryResult>({
    query: PLAYERS_ADMIN_QUERY,
    variables: {
      searchQuery,
    },
  });

  const triggerRefetch = useCallback(() => refetch(), [refetch]);

  return (
    <StyledPlayerList>
      {data?.adminPlayers.map((player) => (
        <PlayerListItem
          key={player.id}
          player={player}
          afterUpdate={triggerRefetch}
          afterDelete={triggerRefetch}
        />
      ))}
    </StyledPlayerList>
  );
};
