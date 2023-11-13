import styled, { DefaultTheme } from "styled-components";
import { Paragraph500Props } from "../../design/fonts/NewFonts";
import { ButtonProps } from "./Button";

export enum ButtonVariants {
  DEFAULT,
  OUTLINED,
}

export enum ColorSchemes {
  DEFAULT,
  SECONDARY,
  LIGHT,
}

const defaultColorsByColorScheme: {
  [key in ColorSchemes]: (theme: DefaultTheme) => {
    backgroundColor: string;
    color: string;
    ":hover": {
      backgroundColor: string;
    };
  };
} = {
  [ColorSchemes.DEFAULT]: (theme: DefaultTheme) => ({
    color: theme.colors.newDesign.grayScale[90],
    backgroundColor: theme.colors.newDesign.primary,
    ":hover": {
      backgroundColor: "#DB9805",
    },
  }),
  [ColorSchemes.SECONDARY]: (theme: DefaultTheme) => ({
    color: theme.colors.newDesign.grayScale[5],
    backgroundColor: theme.colors.newDesign.secondary,
    ":hover": {
      backgroundColor: "#3E30A3",
    },
  }),
  [ColorSchemes.LIGHT]: (theme: DefaultTheme) => ({
    color: theme.colors.newDesign.grayScale[95],
    backgroundColor: theme.colors.newDesign.grayScale[5],
    ":hover": {
      backgroundColor: theme.colors.newDesign.grayScale[30],
    },
  }),
};

const outlinedColorsByColorScheme: {
  [key in ColorSchemes]: (theme: DefaultTheme) => {
    backgroundColor: string;
    color: string;
    ":hover": {
      backgroundColor: string;
    };
  };
} = {
  [ColorSchemes.DEFAULT]: (theme: DefaultTheme) => ({
    color: theme.colors.newDesign.grayScale[5],
    backgroundColor: "transparent",
    border: `1.4px solid ${theme.colors.newDesign.primary}`,

    ":hover": {
      color: theme.colors.newDesign.grayScale[95],
      backgroundColor: theme.colors.newDesign.primary,
    },
  }),
  [ColorSchemes.SECONDARY]: (theme: DefaultTheme) => ({
    color: theme.colors.newDesign.grayScale[5],
    backgroundColor: "transparent",
    border: `1.4px solid ${theme.colors.newDesign.secondary}`,

    ":hover": {
      backgroundColor: theme.colors.newDesign.secondary,
    },
  }),
  [ColorSchemes.LIGHT]: (theme: DefaultTheme) => ({
    color: theme.colors.newDesign.grayScale[5],
    backgroundColor: "transparent",
    border: `1.4px solid ${theme.colors.newDesign.grayScale[5]}`,
    ":hover": {
      color: theme.colors.newDesign.primary,
      backgroundColor: "transparent",
    },
  }),
};

const colorsByVariant: {
  [key in ButtonVariants]: {
    [key in ColorSchemes]: (theme: DefaultTheme) => object;
  };
} = {
  [ButtonVariants.DEFAULT]: defaultColorsByColorScheme,
  [ButtonVariants.OUTLINED]: outlinedColorsByColorScheme,
};

export const ButtonContainer = styled.button<ButtonProps>(
  ({
    theme,
    colorScheme = ColorSchemes.DEFAULT,
    variant = ButtonVariants.DEFAULT,
  }) => ({
    padding: `${theme.spacing(3)} ${theme.spacing(6)}`,
    display: "grid",
    gridTemplateColumns: "0.2fr 1fr",
    gap: theme.spacing(3),
    borderRadius: theme.spacing(2),
    animation: "background-color ease-in-out 300ms",
    cursor: "pointer",
    ...colorsByVariant[variant][colorScheme](theme),
  })
);

export const IconContainer = styled.div(({ theme }) => ({
  gridColumn: 1,
}));

export const TextContainer = styled.div(({ theme }) => ({
  gridColumn: 2,
  ...Paragraph500Props(theme),
}));
