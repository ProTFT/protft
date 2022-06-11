import {
  AccordionPanel,
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { Lobby, Player, PlayerLobbyResult } from "../../graphql/schema";
import groupBy from "lodash.groupby";
import { getFlagEmoji } from "../../formatter/FlagEmoji";
import { useWindowSize } from "../../hooks/useWindowSize";

// For finals
// First sort by points
// Then sort by first place in the last round (if not first place, =0)
// Then sort by top fours
// Then sort by quantity top 1, 2, 3, 4 maybe?

interface StageLobbySectionProps {
  lobbies?: Lobby[] | null;
  lobbyCount?: number;
  isFinal?: boolean | null;
}

export const StageLobbySection = ({
  lobbies,
  lobbyCount,
  isFinal,
}: StageLobbySectionProps) => {
  const size = useWindowSize();
  const groups = groupBy(lobbies, (lobby) => lobby.name.charAt(0));
  const getStageProperties = (lobbyCount?: number) =>
    lobbyCount && lobbyCount > 1 ? { flex: 1 } : {};
  const getParentProperties = (lobbyCount?: number) => ({
    justify:
      lobbyCount && lobbyCount === 1 && size.width && size.width > 800
        ? "center"
        : "space-between",
  });

  return (
    <AccordionPanel display="flex" flexWrap="wrap" gap={10}>
      {Object.keys(groups).map((lobbyGroup) => (
        <Flex
          key={lobbyGroup}
          flexDir="row"
          flexWrap="wrap"
          {...getParentProperties(lobbyCount)}
          width="100%"
          overflow="scroll"
          gap={10}
        >
          {groups[lobbyGroup].map((lobby: Lobby) => (
            <Box key={lobby.sequence} {...getStageProperties(lobbyCount)}>
              <Text>Lobby {lobby?.name}</Text>
              <TableContainer>
                <Table variant="simple" size="sm" colorScheme="orange">
                  <Thead>
                    <ColumnHeaders lobby={lobby} />
                  </Thead>
                  <Tbody>
                    <TableBody lobby={lobby} isFinal={isFinal} />
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Flex>
      ))}
    </AccordionPanel>
  );
};

interface ColumnHeadersProps {
  lobby: Lobby;
}

function ColumnHeaders({ lobby }: ColumnHeadersProps) {
  const roundCount = lobby.roundCount;
  const hasMoreThanOneRound = roundCount > 1;

  const roundHeaders = () => {
    return new Array(roundCount)
      .fill(null)
      .map((_, index) => <Th key={index}>R{index + 1}</Th>);
  };

  return (
    <Tr>
      <Th colSpan={2}>Player</Th>
      {roundHeaders()}
      {hasMoreThanOneRound && <Th>P</Th>}
    </Tr>
  );
}

interface TableBodyProps {
  lobby: Lobby;
  isFinal?: boolean | null;
}

function TableBody({ lobby, isFinal }: TableBodyProps) {
  // Sorting should be moved to the backend
  const sortSingleRoundLobby = (a: PlayerLobbyResult, b: PlayerLobbyResult) =>
    a.positions[0] - b.positions[0];

  const sortCommonLobby = (a: PlayerLobbyResult, b: PlayerLobbyResult) =>
    a.positions.reduce((prev, curr) => prev + curr) -
    b.positions.reduce((prev, curr) => prev + curr);

  const sortFinalsLobby = (a: PlayerLobbyResult, b: PlayerLobbyResult) =>
    b.points.reduce((prev, curr) => prev + curr) -
      a.points.reduce((prev, curr) => prev + curr) ||
    a.positions[a.positions.length - 1] - b.positions[b.positions.length - 1];

  const getSortingMethod = () => {
    if (lobby.roundCount === 1) {
      return sortSingleRoundLobby;
    }
    if (isFinal) {
      return sortFinalsLobby;
    }
    return sortCommonLobby;
  };

  const sortResults = (
    playerResults: PlayerLobbyResult[]
  ): PlayerLobbyResult[] => {
    const sortingMethod = getSortingMethod();
    return playerResults.sort(sortingMethod);
  };

  const playerResults = [...lobby?.playersResults!];
  const sortedResults = sortResults(playerResults);
  const roundCount = lobby.roundCount;
  return (
    <>
      {sortedResults.map((playerResult, index) => (
        <TableRow
          key={playerResult.player.id}
          index={index}
          player={playerResult.player}
          roundCount={roundCount}
        >
          <Td>{getFlagEmoji(playerResult.player.country || "")}</Td>
          <Td>{playerResult.player.name}</Td>
          <PositionDataCell
            playerResult={playerResult}
            roundCount={roundCount}
          />
          <PointsDataCell roundCount={roundCount} playerResult={playerResult} />
        </TableRow>
      ))}
    </>
  );
}

interface TableRowProps {
  player: Player;
  roundCount: number;
  index: number;
}

function TableRow({
  children,
  player,
  index,
  roundCount,
}: React.PropsWithChildren<TableRowProps>) {
  const topFourBackgroundColor = useColorModeValue("blue.100", "blue.900");
  const isSingleRoundTopFour = index <= 3 && roundCount === 1;
  return (
    <Tr
      key={player.id}
      {...(isSingleRoundTopFour
        ? { backgroundColor: topFourBackgroundColor }
        : {})}
    >
      {children}
    </Tr>
  );
}

interface PositionDataCellProps {
  playerResult: PlayerLobbyResult;
  roundCount: number;
}

function PositionDataCell({ playerResult, roundCount }: PositionDataCellProps) {
  const topFourBackgroundColor = useColorModeValue("blue.100", "blue.900");
  const isMultipleRoundTopFour = (position: number) =>
    position <= 4 && roundCount > 1;
  return (
    <>
      {playerResult.positions.map((position: number, index) => (
        <Td
          key={index}
          {...(isMultipleRoundTopFour(position)
            ? { backgroundColor: topFourBackgroundColor }
            : {})}
        >
          {position}
        </Td>
      ))}
    </>
  );
}

interface PointsDataCellProps {
  roundCount: number;
  playerResult: PlayerLobbyResult;
}

function PointsDataCell({ roundCount, playerResult }: PointsDataCellProps) {
  if (roundCount > 1) {
    return <Td>{playerResult.points.reduce((prev, curr) => prev + curr)}</Td>;
  }
  return <></>;
}



