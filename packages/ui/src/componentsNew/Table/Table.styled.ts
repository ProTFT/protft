import styled from "styled-components";
import {
  BodyBold700Props,
  BodyRegular400Props,
} from "../../design/fonts/NewFonts";

export const TableStyled = styled.table(({ theme }) => ({
  tableLayout: "fixed",
  backgroundColor: theme.colors.newDesign.grayScale[70],
  width: "100%",
  color: theme.colors.newDesign.grayScale[5],
  borderCollapse: "collapse",
  borderSpacing: "10rem 0rem",
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
  td: {
    padding: `${theme.spacing(6)} ${theme.spacing(10)}`,
  },
}));

export const PointContainer = styled.div(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: "rgba(252, 252, 252, 0.10)",
  padding: `${theme.spacing(1)} ${theme.spacing(0)}`,
  justifyContent: "center",
  alignItems: "center",
  display: "grid",
  width: theme.spacing(30),
  ...BodyBold700Props(theme), // do it only based on flag
}));
