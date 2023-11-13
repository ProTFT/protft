import styled, { DefaultTheme } from "styled-components";

export const Title700 = styled.p(({ theme }) => ({
  fontFamily: "DMSans",
  fontSize: theme.spacing(12),
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: theme.spacing(10),
  letterSpacing: theme.spacing(0.24),
  textTransform: "uppercase",
}));

export const Text500 = styled.p(({ theme }) => ({
  fontFamily: "DMSans",
  fontSize: theme.spacing(9),
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: theme.spacing(11),
  letterSpacing: theme.spacing(0.36),
}));

export const BodyRegular400Props = (theme: DefaultTheme) => ({
  fontFamily: "DMSans",
  fontSize: theme.spacing(9),
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: theme.spacing(11),
  letterSpacing: theme.spacing(0.36),
});

export const BodyRegular400 = styled.p(({ theme }) =>
  BodyRegular400Props(theme)
);

export const BodyBold700Props = (theme: DefaultTheme) => ({
  fontFamily: "DMSans",
  fontSize: theme.spacing(9),
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: theme.spacing(11),
  letterSpacing: theme.spacing(0.36),
});

export const BodyBold700 = styled.p(({ theme }) => BodyBold700Props(theme));

export const AltText400Props = (theme: DefaultTheme) => ({
  fontFamily: "DMSans",
  fontSize: theme.spacing(7),
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: theme.spacing(9),
  letterSpacing: theme.spacing(0.14),
});

export const AltText400 = styled.p(({ theme }) => AltText400Props(theme));

export const Paragraph500Props = (theme: DefaultTheme) => ({
  fontFamily: "DMSans",
  fontSize: theme.spacing(8),
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: theme.spacing(9),
  letterSpacing: theme.spacing(0.64),
});

export const Paragraph500 = styled.p(({ theme }) => AltText400Props(theme));
