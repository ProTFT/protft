import styled from "styled-components";
import {
  H1Upper600Props,
  Paragraph500Props,
} from "../../design/fonts/NewFonts";

export const TournamentHeaderContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.newDesign.grayScale[95],
  display: "grid",
  gridTemplateColumns: "1fr 5fr 4fr",
  gridTemplateRows: "1fr",
}));

export const TournamentHeaderImage = styled.img(() => ({
  gridColumn: 1,
  width: "100%",
  height: "100%",
  ...({ objectFit: "cover" } as any),
}));

export const TournamentHeaderTitleContainer = styled.div(({ theme }) => ({
  gridColumn: 2,
  padding: `${theme.spacing(13)} ${theme.spacing(20)}`,
  p: {
    ...Paragraph500Props(theme),
    textTransform: "uppercase",
  },
  h1: {
    ...H1Upper600Props(theme),
    margin: 0,
    color: theme.colors.newDesign.primary,
  },
}));

export const TournamentHeaderTagsContainer = styled.div(({ theme }) => ({
  gridColumn: 3,
  display: "flex",
  gap: theme.spacing(4),
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "end",
  paddingRight: theme.spacing(20),
}));
