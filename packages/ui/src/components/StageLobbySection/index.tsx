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
import { Lobby, Player, PlayerResults } from "../../graphql/schema";
import groupBy from "lodash.groupby";
import { getFlagEmoji } from "../../formatter/FlagEmoji";
import { useWindowSize } from "../../hooks/useWindowSize";

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
  const groups = groupBy(lobbies, (lobby) => lobby.name.charAt(1) || 0);
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
          // width="100%"
          overflow="scroll"
          gap={5}
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
                    {/* <TableBody lobby={lobby} isFinal={isFinal} /> */}
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
  const roundCount = 10; //TODO: arrumar aqui
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
  playerResults: PlayerResults[];
}

function TableBody({ playerResults }: TableBodyProps) {
  const roundCount = playerResults[0].points.length;
  return (
    <>
      {playerResults.map((playerResult, index) => (
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
  playerResult: PlayerResults;
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
  playerResult: PlayerResults;
}

function PointsDataCell({ roundCount, playerResult }: PointsDataCellProps) {
  if (roundCount > 1) {
    return <Td>{playerResult.points.reduce((prev, curr) => prev + curr)}</Td>;
  }
  return <></>;
}



