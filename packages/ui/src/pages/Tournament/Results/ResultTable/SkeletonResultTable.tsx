import { useMemo } from "react";
import { CountryIndicator } from "../../../../components/RegionIndicator/RegionIndicator";
import { Player, PlayerResults } from "../../../../graphql/schema";
import {
  StyledTable,
  StyledTableRoundHeader,
  StyledTablePlayerHeader,
  StyledTableRow,
  StyledTableData,
  StyledTablePlayerName,
  StyledPlayerName,
  StyledLobbyContainer,
  StyledLobbyGroupContainer,
  StyledLobbyResultsContainer,
} from "../Results.styled";

const generatePlayers = (quantity: number) => {
  return new Array(quantity).fill(1).map((_, index) => ({
    player: {
      id: index,
      name: "Loading",
      country: "BRA",
    } as unknown as Player,
    points: [0, 0, 0, 0, 0, 0],
    positions: [1, 1, 1, 1, 1, 1],
    lobbyPlayerId: 1,
  }));
};

export const SkeletonResultTable = () => {
  const roundCount = 6;
  const results: PlayerResults[] = generatePlayers(8);
  const roundHeaders = useMemo(
    () =>
      new Array(roundCount)
        .fill(0)
        .map((_, index) => (
          <StyledTableRoundHeader key={index}>{`R${
            index + 1
          }`}</StyledTableRoundHeader>
        )),
    []
  );

  const viewHasQualification = false;

  return (
    <StyledLobbyResultsContainer show={true}>
      <StyledLobbyGroupContainer>
        <StyledLobbyContainer>
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
                  qualifiedCount={0}
                  hasQualifier={viewHasQualification}
                >
                  <StyledTableData>{index + 1}</StyledTableData>
                  <td>
                    <StyledTablePlayerName>
                      <CountryIndicator
                        countryCode={player.country}
                        showName={false}
                      />
                      <StyledPlayerName>{player.name}</StyledPlayerName>
                    </StyledTablePlayerName>
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
        </StyledLobbyContainer>
      </StyledLobbyGroupContainer>
    </StyledLobbyResultsContainer>
  );
};
