import { CountryIndicator } from "../../components/RegionIndicator/RegionIndicator";
import { Button } from "../Button/Button";
import { ButtonVariants, ColorSchemes } from "../Button/Button.styled";
import {
  ColumnHeader,
  TableValueContainer,
  TableDataForPoints,
  ColumnHeaderForPoints,
  TableStyled,
  TableWrapper,
  PointsContainer,
  PositionContainer,
  HighlightedPositionContainer,
} from "./Table.styled";

const mockData = {
  rank: 1,
  name: "setsuko",
  points: 40,
  positions: [1, 2, 3, 4, 5, 6],
  qualified: true,
};

const example = [
  mockData,
  mockData,
  mockData,
  mockData,
  mockData,
  mockData,
  mockData,
  mockData,
];

const rounds = [1, 2, 3, 4, 5, 6];

export const Table = () => {
  return (
    <TableWrapper>
      <TableStyled>
        <thead>
          <tr>
            <ColumnHeader size={25}>#</ColumnHeader>
            <ColumnHeader size={100}>Name</ColumnHeader>
            <ColumnHeader size={40}>P</ColumnHeader>
            {rounds.map((round) => (
              <ColumnHeaderForPoints>{`R${round}`}</ColumnHeaderForPoints>
            ))}
            <th align="left" />
          </tr>
        </thead>
        <tbody>
          {example.map((data) => (
            <tr>
              <td>{data.rank}</td>
              <td>
                {/* <CountryIndicator countryCode={"BRA"} showName={false} /> */}
                {data.name}
              </td>
              <td>
                <PointsContainer>{data.points}</PointsContainer>
              </td>
              {data.positions.map((position) => (
                <TableDataForPoints>
                  {position > 4 ? (
                    <PositionContainer>{position}</PositionContainer>
                  ) : (
                    <HighlightedPositionContainer>
                      {position}
                    </HighlightedPositionContainer>
                  )}
                </TableDataForPoints>
              ))}
              {data.qualified && (
                <td align="right">
                  <Button
                    colorScheme={ColorSchemes.SECONDARY}
                    variant={ButtonVariants.OUTLINED}
                  >
                    FILTRAR
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </TableWrapper>
  );
};
