import {
  AccordionPanel,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { Player, PlayerLobbyResult, Stage } from "../../graphql/schema";
import { getFlagEmoji } from "../../formatter/FlagEmoji";

// For finals
// First sort by points
// Then sort by first place in the last round (if not first place, =0)
// Then sort by top fours
// Then sort by quantity top 1, 2, 3, 4 maybe?

// G&G world finals
// Highest amount of 1st's
// Highest amount of Top 4's
// Highest placement in most recent game (if tied, look at previous game until no tie)
// Round eliminated in most recent game (if tied, look at previous until no tie)
// Coinflip

interface StageLobbySectionProps {
  stage: Stage;
  lobbyCount?: number;
  isFinal?: boolean | null;
}

export const NewStageLobbySection = ({ stage }: StageLobbySectionProps) => {
  return (
    <AccordionPanel display="flex" justifyContent="center">
      <Box>
        <TableContainer>
          <Table variant="simple" size="sm" colorScheme="orange">
            <Thead>
              <ColumnHeaders stage={stage} />
            </Thead>
            <Tbody>
              <TableBody stage={stage} isFinal={stage?.isFinal} />
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </AccordionPanel>
  );
};

interface ColumnHeadersProps {
  stage: Stage;
}

function ColumnHeaders({ stage }: ColumnHeadersProps) {
  const roundCount = stage?.roundCount;
  const hasMoreThanOneRound = roundCount > 1;

  const roundHeaders = () => {
    return new Array(roundCount)
      .fill(null)
      .map((_, index) => <Th key={index}>R{index + 1}</Th>);
  };

  return (
    <Tr>
      <Th>#</Th>
      <Th colSpan={2}>Player</Th>
      {roundHeaders()}
      {hasMoreThanOneRound && <Th>P</Th>}
    </Tr>
  );
}

interface TableBodyProps {
  stage: Stage;
  isFinal?: boolean | null;
}

function TableBody({ stage, isFinal }: TableBodyProps) {
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
    if (stage.roundCount === 1) {
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

  const playerResults = [...stage?.playersResults!];
  const sortedResults = sortResults(playerResults);
  const roundCount = stage.roundCount;
  return (
    <>
      {sortedResults.map((playerResult, index) => (
        <TableRow
          key={playerResult.player.id}
          index={index}
          player={playerResult.player}
          roundCount={roundCount}
        >
          <Td>{index + 1}</Td>
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
