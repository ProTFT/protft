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
import { Player, PlayerResults } from "../../graphql/schema";
import { getFlagEmoji } from "../../formatter/FlagEmoji";
import { gql, useQuery } from "urql";
import { Link } from "react-router-dom";

interface StageLobbySectionProps {
  stageId: number;
}

const RESULT_QUERY = gql`
  query resultsByStage($stageId: Int!) {
    resultsByStage(stageId: $stageId) {
      player {
        id
        name
        country
      }
      positions
      points
    }
  }
`;

export const NewStageLobbySection = ({ stageId }: StageLobbySectionProps) => {
  const [{ data }] = useQuery<{ resultsByStage: PlayerResults[] }>({
    query: RESULT_QUERY,
    variables: { stageId },
  });
  return (
    <AccordionPanel display="flex" justifyContent="center">
      <Box>
        {!data || data.resultsByStage.length === 0 ? (
          <div>No data</div>
        ) : (
          <TableContainer>
            <Table variant="simple" size="sm" colorScheme="orange">
              <Thead>
                <ColumnHeaders
                  roundCount={data.resultsByStage[0].points.length}
                />
              </Thead>
              <Tbody>
                <TableBody results={data.resultsByStage} />
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AccordionPanel>
  );
};

interface ColumnHeadersProps {
  roundCount: number;
}

function ColumnHeaders({ roundCount }: ColumnHeadersProps) {
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
  results: PlayerResults[];
}

function TableBody({ results }: TableBodyProps) {
  const roundCount = results[0].points.length;
  return (
    <>
      {results.map((playerResult, index) => (
        <TableRow
          key={playerResult.player.id}
          index={index}
          player={playerResult.player}
          roundCount={roundCount}
        >
          <Td>{index + 1}</Td>
          <Td>{getFlagEmoji(playerResult.player.country || "")}</Td>
          <Td>
            <Link to={`/players/${playerResult.player.id}`}>
              {playerResult.player.name}
            </Link>
          </Td>
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
