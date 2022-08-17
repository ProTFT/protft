import { useQuery } from "urql";
import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import {
  PlayerQueryResult,
  PlayerTournamentQueryResult,
  PLAYER_QUERY,
  PLAYER_TOURNAMENT_QUERY,
} from "./queries";
import { PageTitle } from "../../components/PageTitle";
import { getFlagEmoji } from "../../formatter/FlagEmoji";

const StatBox = ({
  text,
  value,
}: {
  text: string;
  value?: string | number;
}) => {
  return (
    <Box borderWidth={2} flexDir="column" p={5} borderRadius="lg">
      <Text fontWeight="bold">{text}</Text>
      <Text>{value}</Text>
    </Box>
  );
};

export const Player = () => {
  const { playerId } = useParams();
  const [{ data }] = useQuery<PlayerQueryResult>({
    query: PLAYER_QUERY,
    variables: { id: Number(playerId) },
  });

  const [{ data: tournamentData }] = useQuery<PlayerTournamentQueryResult>({
    query: PLAYER_TOURNAMENT_QUERY,
    variables: { playerId: Number(playerId) },
  });

  return (
    <Box textAlign="center" fontSize="xl" display="flex">
      <Flex flexDirection="column" boxSize="100%" gap={10} px="20%">
        <PageTitle
          text={
            getFlagEmoji(data?.player.country || "") + " " + data?.player.name
          }
        />
        <Flex flex="50%" gap={10}>
          <Flex gap={10} justifyContent="space-between" flexWrap="wrap">
            <StatBox
              text="Total games"
              value={data?.player.playerStats?.totalGames}
            />
            <StatBox
              text="Average Position"
              value={data?.player.playerStats?.averagePosition}
            />
            <StatBox
              text="Top Four %"
              value={
                (
                  ((data?.player.playerStats?.topFourCount || 0) /
                    (data?.player.playerStats?.totalGames || 1)) *
                  100
                ).toFixed(2) + "%"
              }
            />
            <StatBox
              text="Top One %"
              value={
                (
                  ((data?.player.playerStats?.topOneCount || 0) /
                    (data?.player.playerStats?.totalGames || 1)) *
                  100
                ).toFixed(2) + "%"
              }
            />
          </Flex>
          <Flex flexDir="column" alignSelf="start">
            <Text>Played in</Text>
            <List>
              {tournamentData?.tournamentsPlayed.map(({ id, name }) => (
                <Link key={id} to={`/tournaments/${id}`}>
                  <ListItem textDecor="underline">{name}</ListItem>
                </Link>
              ))}
            </List>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
