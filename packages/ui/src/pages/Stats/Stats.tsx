import {
  Box,
  Text,
  Select,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Button,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useQuery } from "urql";
import {
  PlayersQueryWithStatsArgs,
  PlayersQueryWithStatsResult,
  PLAYERS_QUERY_WITH_STATS,
} from "./queries";
// import { SuspenseElement } from "../../components/SuspendedPage";

export const Stats = () => {
  const [page, setPage] = useState(0);
  const paginationArgs = useMemo(
    () => ({
      skip: page * 10,
      take: 10,
    }),
    [page]
  );

  const [regionInput, setRegionInput] = useState("");
  const [setInput, setSetInput] = useState("");

  const [{ data: stats }] = useQuery<
    PlayersQueryWithStatsResult,
    PlayersQueryWithStatsArgs
  >({
    query: PLAYERS_QUERY_WITH_STATS,
    variables: {
      region: regionInput,
      setId: Number(setInput),
      ...paginationArgs,
    },
  });

  return (
    <Box textAlign="center" display="flex" px="20%" pt={3} flexDir="column">
      <Box display="flex" gap={10}>
        <div>
          <Text>Region</Text>
          <Select onChange={(event) => setRegionInput(event.target.value)}>
            <option key="" value=""></option>
            <option key="NA" value="NA">
              NA
            </option>
            <option key="EMEA" value="EMEA">
              EMEA
            </option>
            <option key="BR" value="BR">
              BR
            </option>
            <option key="CH" value="CH">
              CH
            </option>
          </Select>
        </div>
        <div>
          <Text>Set</Text>
          <Select onChange={(event) => setSetInput(event.target.value)}>
            <option key="" value="" />
            <option key="7" value="7">
              7
            </option>
            <option key="6" value="6">
              6
            </option>
            <option key="5" value="5">
              5
            </option>
          </Select>
        </div>
        <div>
          <Text>Tournaments</Text>
          <Select></Select>
        </div>
        <Text>{page}</Text>
        <Button onClick={() => setPage((page) => page + 1)}>Load more</Button>
      </Box>
      <Box>
        <TableContainer>
          <Table variant="simple" size="sm" colorScheme="orange">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>GP</Th>
                <Th>Avg Pos</Th>
                <Th>Top 1 %</Th>
                <Th>Top 4 %</Th>
                <Th>Top 8 %</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stats?.playerStats.map(
                ({
                  player,
                  totalGames,
                  topFourCount,
                  topOneCount,
                  averagePosition,
                  eigthCount,
                }) => (
                  <Tr key={player.id}>
                    <Td>{player.name}</Td>
                    <Td>{totalGames}</Td>
                    <Td>{averagePosition}</Td>
                    <Td>{topOneCount}</Td>
                    <Td>{topFourCount}</Td>
                    <Td>{eigthCount}</Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
