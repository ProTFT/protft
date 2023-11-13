import styled from "styled-components";
import {
  BodyBold700Props,
  BodyRegular400Props,
} from "../../design/fonts/NewFonts";

export const TableWrapper = styled.div((_) => ({
  width: "100%",
  overflowX: "auto",
  // center table
}));

export const TableStyled = styled.table(({ theme }) => ({
  tableLayout: "fixed",
  backgroundColor: theme.colors.newDesign.grayScale[70],
  // width: "100%",
  color: theme.colors.newDesign.grayScale[5],
  borderCollapse: "collapse",
  borderSpacing: "10rem 0rem",
  borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
  "*": {
    ...BodyRegular400Props(theme),
  },
  "tr:nth-child(odd)": {
    backgroundColor: theme.colors.newDesign.grayScale[60],
  },
  th: {
    backgroundColor: theme.colors.newDesign.grayScale[90],
    padding: `${theme.spacing(8)} ${theme.spacing(10)}`,
  },
  "th:first-child": {
    borderRadius: `${theme.spacing(2)} 0 0 0`,
  },
  "th:last-child": {
    borderRadius: `0 ${theme.spacing(2)} 0  0`,
  },
  td: {
    textAlign: "center",
    padding: `${theme.spacing(6)} ${theme.spacing(6)} ${theme.spacing(
      6
    )} ${theme.spacing(6)}`,
  },
}));

export const ColumnHeaderForPoints = styled.th(({ theme }) => ({
  width: theme.spacing(40),
}));

export const TableDataForPoints = styled.td(({ theme }) => ({
  width: theme.spacing(40),
}));

export const ColumnHeader = styled.th<{ size: number }>(({ theme, size }) => ({
  width: theme.spacing(size),
}));

export const TableValueContainer = styled.div(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: "rgba(252, 252, 252, 0.10)",
  padding: `${theme.spacing(2.5)} ${theme.spacing(0)}`,
  justifyContent: "center",
  alignItems: "center",
  display: "grid",
  width: theme.spacing(30),
  ...BodyRegular400Props(theme),
}));

export const PositionContainer = styled(TableValueContainer)(() => ({}));

export const HighlightedPositionContainer = styled(TableValueContainer)(
  ({ theme }) => ({
    border: `1px solid ${theme.colors.newDesign.primary}`,
    color: theme.colors.newDesign.primary,
    ...BodyBold700Props(theme), // do it only based on flag
  })
);

export const PointsContainer = styled(TableValueContainer)(({ theme }) => ({
  backgroundColor: theme.colors.newDesign.secondary,
  color: theme.colors.newDesign.grayScale[5],
  ...BodyBold700Props(theme), // do it only based on flag
}));

export const HighlightedPointsContainer = styled(TableValueContainer)(
  ({ theme }) => ({
    backgroundColor: theme.colors.newDesign.grayScale[90],
    color: theme.colors.newDesign.grayScale[5],
    ...BodyBold700Props(theme), // do it only based on flag
  })
);
