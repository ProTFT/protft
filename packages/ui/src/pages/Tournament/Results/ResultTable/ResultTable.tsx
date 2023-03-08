import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CountryIndicator } from "../../../../components/RegionIndicator/RegionIndicator";
import { PlayerResults, StageType } from "../../../../graphql/schema";
import { ViewType } from "../Results";
import {
  StyledTable,
  StyledTableRoundHeader,
  StyledTablePlayerHeader,
  StyledTableRow,
  StyledTableData,
  StyledTablePlayerName,
  StyledPlayerName,
} from "../Results.styled";

interface Props {
  roundCount: number;
  results: PlayerResults[];
  stageType?: StageType;
  currentView: ViewType;
  qualifiedCount: number;
}

export const ResultTable = ({
  roundCount,
  results,
  stageType,
  currentView,
  qualifiedCount,
}: Props) => {
  const roundHeaders = useMemo(
    () =>
      new Array(roundCount)
        .fill(0)
        .map((_, index) => (
          <StyledTableRoundHeader key={index}>{`R${
            index + 1
          }`}</StyledTableRoundHeader>
        )),
    [roundCount]
  );

  const viewHasQualification = useMemo(() => {
    return Boolean(
      qualifiedCount &&
        ((stageType === StageType.GROUP_BASED &&
          currentView === ViewType.LOBBY) ||
          (stageType === StageType.RANKING &&
            currentView === ViewType.OVERVIEW))
    );
  }, [currentView, qualifiedCount, stageType]);

  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTableRoundHeader>#</StyledTableRoundHeader>
          <StyledTablePlayerHeader>Player</StyledTablePlayerHeader>
          <StyledTableRoundHeader>P</StyledTableRoundHeader>
          {roundHeaders}
        </tr>
      </thead>
      <tbody>
        {results.map(({ player, points, positions }, index) => (
          <StyledTableRow
            key={player.id}
            index={index}
            qualifiedCount={qualifiedCount}
            hasQualifier={viewHasQualification}
          >
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
          </StyledTableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};
