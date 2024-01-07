import styled from "styled-components";
import { Paragraph400Props } from "../../design/fonts/NewFonts";

export const TournamentContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(30),
  paddingTop: theme.spacing(22),
}));

export const InfoCardContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(18),
}));

export const FormatCardsContainer = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(15),
  flexWrap: "wrap",
  flex: "1 0 0",

  div: {
    maxWidth: theme.spacing(180),
  },
}));

export const FormatCardsContent = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),

  div: {
    backgroundColor: theme.colors.newDesign.grayScale[80],
    padding: theme.spacing(6),
    borderRadius: theme.spacing(3),

    p: {
      ...Paragraph400Props(theme),
    },
  },
}));

export const FormatTiebreakersContent = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
}));

export const StageHeader = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "9fr 1fr",
  paddingBottom: theme.spacing(20),
}));

export const StageSelectorContainer = styled.div(({ theme }) => ({
  display: "grid",
  maxWidth: "fit-content",
  gridColumn: 1,
}));

export const StageExtraControlsContainer = styled.div(({ theme }) => ({
  display: "grid",
  gridColumn: 2,
  justifyContent: "end",
}));
