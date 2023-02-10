import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { CountryIndicator } from "../../../components/RegionIndicator/RegionIndicator";
import { Stage } from "../../../graphql/schema";
import { NoDataAdded } from "../NoDataAdded/NoDataAdded";
import { ResultsQueryResponse, RESULTS_QUERY } from "../queries";
import {
  StyledPlayerName,
  StyledResultsContainer,
  StyledTable,
  StyledTableData,
  StyledTablePlayerHeader,
  StyledTablePlayerName,
  StyledTableRoundHeader,
  StyledTournamentModeButton,
} from "./Results.styled";

export const Results = ({
  open,
  selectedStage,
}: {
  open: boolean;
  selectedStage: Stage | null;
}) => {
  const [{ data }] = useQuery<ResultsQueryResponse>({
    query: RESULTS_QUERY,
    variables: { stageId: selectedStage?.id },
    pause: !selectedStage,
  });

  if (data?.resultsByStage.length === 0 && open) {
    return (
      <StyledResultsContainer show={open}>
        <NoDataAdded />
      </StyledResultsContainer>
    );
  }

  return (
    <StyledResultsContainer show={open}>
      {false && (
        <StyledTournamentModeButton>Lobbies</StyledTournamentModeButton>
      )}
      <StyledTable>
        <thead>
          <tr>
            <StyledTableRoundHeader>#</StyledTableRoundHeader>
            <StyledTablePlayerHeader>Player</StyledTablePlayerHeader>
            <StyledTableRoundHeader>P</StyledTableRoundHeader>
            {new Array(selectedStage?.roundCount).fill(0).map((_, index) => (
              <StyledTableRoundHeader key={index}>{`R${
                index + 1
              }`}</StyledTableRoundHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.resultsByStage.map(({ player, points, positions }, index) => (
            <tr key={player.id}>
              <StyledTableData>{index + 1}</StyledTableData>
              <td>
                <Link to={`/players/${player.slug}`}>
                  <StyledTablePlayerName>
                    <CountryIndicator
                      countryCode={player.country}
                      showName={false}
                    />
                    <StyledPlayerName>{player.name}</StyledPlayerName>
                  </StyledTablePlayerName>
                </Link>
              </td>
              <StyledTableData>
                {points.reduce((prev, cur) => prev + cur, 0)}
              </StyledTableData>
              {positions.map((position, index) => (
                <StyledTableData key={index} highlighted={position <= 4}>
                  {position}
                </StyledTableData>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </StyledResultsContainer>
  );
};
