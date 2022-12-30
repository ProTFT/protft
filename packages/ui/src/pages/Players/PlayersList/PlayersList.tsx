import { useQuery } from "urql";
import { PlayerCard } from "../components/PlayerCard";
import { StyledPlayersList } from "../Players.styled";
import {
  PlayersQueryResult,
  PlayersQueryVariables,
  PLAYERS_QUERY,
} from "../queries";

interface Props {
  searchQuery: string;
}

export const PlayersList = ({ searchQuery }: Props) => {
  // TODO: possibly move the stats query to the inner component to avoid unused data on mobile
  const [{ data }] = useQuery<PlayersQueryResult, PlayersQueryVariables>({
    query: PLAYERS_QUERY,
    variables: { searchQuery },
  });
  return (
    <StyledPlayersList>
      {data?.players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </StyledPlayersList>
  );
};
