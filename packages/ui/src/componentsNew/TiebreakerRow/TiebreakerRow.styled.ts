import styled from "styled-components";
import {
  Paragraph400Props,
  Paragraph700Props,
} from "../../design/fonts/NewFonts";

export const TiebreakerRowContainer = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 9fr",
  gridTemplateRows: "1fr",
}));

export const TiebreakerRowSequence = styled.div(({ theme }) => ({
  display: "grid",
  backgroundColor: theme.colors.newDesign.primary,
  padding: theme.spacing(6),
  alignItems: "center",
  justifyContent: "center",
  borderRadius: `${theme.spacing(3)} 0 0 ${theme.spacing(3)}`,
  ...Paragraph700Props(theme),
}));

export const TiebreakerRowDescription = styled.div(({ theme }) => ({
  display: "grid",
  backgroundColor: theme.colors.newDesign.grayScale[80],
  padding: theme.spacing(6),
  alignItems: "start",
  borderRadius: `0 ${theme.spacing(3)} ${theme.spacing(3)} 0`,
  color: theme.colors.newDesign.grayScale[5],
  ...Paragraph400Props(theme),
}));
