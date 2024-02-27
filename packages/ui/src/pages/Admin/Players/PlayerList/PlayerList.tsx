import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { PlayerListItem } from "../PlayerListItem/PlayerListItem";
import { PlayersQueryResult, PLAYERS_ADMIN_QUERY } from "../queries";
import { StyledPlayerList } from "./PlayerList.styled";

interface Props {
  searchQuery: string;
}

export const PlayerList = ({ searchQuery }: Props) => {
  const [{ data }] = useQuery<PlayersQueryResult>({
    query: PLAYERS_ADMIN_QUERY,
    variables: {
      searchQuery,
    },
  });

  return (
    <StyledPlayerList>
      {data?.adminPlayers.map((player) => (
        <Link key={player.id} to={`${player.id}/links`}>
          <PlayerListItem key={player.id} player={player} />
        </Link>
      ))}
    </StyledPlayerList>
  );
};
