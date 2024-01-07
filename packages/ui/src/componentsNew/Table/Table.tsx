import { useMemo } from "react";
import { Button } from "../Button/Button";
import { ButtonVariants, ColorSchemes } from "../Button/Button.styled";
import {
  ColumnHeader,
  TableDataForPoints,
  ColumnHeaderForPoints,
  TableStyled,
  TableWrapper,
  PointsContainer,
  PositionContainer,
  HighlightedPositionContainer,
} from "./Table.styled";

export interface TableResult {
  name: string;
  country: string;
  totalPoints: number;
  positions: number[];
}

type ResultWithQualification = TableResult &
  Partial<Pick<TableQualificationRule, "relevance" | "description" | "link">>;

interface TableQualificationRule {
  // TODO: migration to convert qualifiedCount to this format
  initialPosition: number;
  finalPosition: number;
  relevance: number; // TODO this should define the color, so maybe an enum? Primary, secondary...
  description: string;
  link: string;
}

interface TableProps {
  numberOfRounds: number;
  results: TableResult[];
  qualificationRules: TableQualificationRule[];
}

export const Table = ({
  numberOfRounds,
  qualificationRules,
  results,
}: TableProps) => {
  const arrayOfRounds = new Array(numberOfRounds).fill({});
  const resultsWithQualification = useMemo<ResultWithQualification[]>(() => {
    return results.map((result, index) => {
      const realPosition = index + 1;
      const ruleThatApplies = qualificationRules.find(
        (rule) =>
          rule.initialPosition <= realPosition &&
          rule.finalPosition >= realPosition
      );
      if (!ruleThatApplies) {
        return result;
      }
      return {
        ...result,
        relevance: ruleThatApplies.relevance,
        description: ruleThatApplies.description,
        link: ruleThatApplies.link,
      };
    });
  }, [qualificationRules, results]);
  return (
    <TableWrapper>
      <TableStyled>
        <thead>
          <tr>
            <ColumnHeader size={25}>#</ColumnHeader>
            <ColumnHeader size={100}>Name</ColumnHeader>
            <ColumnHeader size={40}>P</ColumnHeader>
            {arrayOfRounds.map((_, index) => (
              <ColumnHeaderForPoints key={index}>{`R${
                index + 1
              }`}</ColumnHeaderForPoints>
            ))}
            <th align="left" />
          </tr>
        </thead>
        <tbody>
          {resultsWithQualification.map((data, index) => (
            <tr key={data.name}>
              <td>{index + 1}</td>
              <td>
                {/* <CountryIndicator countryCode={data.country} showName={false} /> */}
                {data.name}
              </td>
              <td>
                <PointsContainer>{data.totalPoints}</PointsContainer>
              </td>
              {data.positions.map((position, index) => (
                <TableDataForPoints key={index}>
                  {position > 4 ? (
                    <PositionContainer>{position}</PositionContainer>
                  ) : (
                    <HighlightedPositionContainer>
                      {position}
                    </HighlightedPositionContainer>
                  )}
                </TableDataForPoints>
              ))}
              {false && (
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
