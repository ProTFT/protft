import { useQuery } from "urql";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { PlayerQueryResult, PLAYER_QUERY } from "./queries";

export const Player = () => {
  const { playerId } = useParams();
  const [{ data }] = useQuery<PlayerQueryResult>({
    query: PLAYER_QUERY,
    variables: { id: Number(playerId) },
  });
  return (
    <Box textAlign="center" fontSize="xl" display="flex">
      <div>{data?.player.name}</div>
      <div>{data?.player.country}</div>
      <div>{data?.player.region}</div>
    </Box>
  );
};
