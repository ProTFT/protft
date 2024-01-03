import styled, { css } from "styled-components";
import {
  AltText400Props,
  AltText700Props,
  H4Med500Props,
  Paragraph400Props,
  Paragraph500Props,
} from "../../design/fonts/NewFonts";
import { Badge } from "../Badge/Badge";

export const CardContainer = styled.div(({ theme }) => ({
  maxWidth: "fit-content",
  display: "flex",
  flexDirection: "column",
}));

export const CardHeader = styled.div(({ theme }) => ({
  padding: theme.spacing(10),
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  borderRadius: `${theme.spacing(5)} ${theme.spacing(5)} 0 0`,
  backgroundColor: theme.colors.newDesign.grayScale[90],
}));

export const CardTitle = styled.p(({ theme }) => ({
  display: "grid",
  gridColumn: 1,
  alignItems: "center",
  ...H4Med500Props(theme),
}));

export const CardBadgeContainer = styled.div(({ theme }) => ({
  display: "grid",
  gridColumn: 2,
  alignItems: "center",
  justifyContent: "end",
}));

export const CardBody = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.newDesign.grayScale[70],
  padding: theme.spacing(10),
  borderRadius: `0 0 ${theme.spacing(5)} ${theme.spacing(5)}`,
  display: "flex",
}));

export const CardBadge = styled(Badge)(({ theme }) => ({
  backgroundColor: theme.colors.newDesign.primary,
  padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
  p: {
    textAlign: "center",
    color: theme.colors.newDesign.grayScale[95],
    ...AltText700Props(theme),
  },
}));
