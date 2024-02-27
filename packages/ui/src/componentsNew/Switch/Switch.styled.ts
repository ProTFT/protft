import styled from "styled-components";
import { Switch } from "react-aria-components";
import { Label500Props } from "../../design/fonts/NewFonts";

export const StyledSwitch = styled(Switch)<{
  selectedBackgroundColor?: string;
}>(({ theme, selectedBackgroundColor = theme.colors.newDesign.secondary }) => ({
  display: "flex",
  alignItems: "center",
  // gap between ellipsis and text
  gap: "0.571rem",
  // fontSize: "1.143rem",
  color: "white",
  forcedColorAdjust: "none",
  ...Label500Props(theme),
  cursor: "pointer",

  // Switch default state
  ".indicator": {
    width: theme.spacing(25),
    height: theme.spacing(12.5),
    background: theme.colors.newDesign.grayScale[30],
    borderRadius: theme.spacing(8),
    transition: "all 180ms",

    "&:before": {
      content: "''",
      display: "block",
      margin: theme.spacing(2),
      width: theme.spacing(9),
      height: theme.spacing(9),
      background: theme.colors.newDesign.grayScale[5],
      filter: "drop-shadow(0px 2px 4px rgba(0, 35, 11, 0.20))",
      borderRadius: theme.spacing(8),
      transition: "all 180ms",
    },
  },

  // switch when pressed
  "&[data-pressed] .indicator": {
    "&:before": {
      width: theme.spacing(11.5),
    },
  },

  // When selected
  "&[data-selected]": {
    ".indicator": {
      borderColor: "gray",
      background: selectedBackgroundColor,

      "&:before": {
        transform: "translateX(130%)",
      },
    },

    "&[data-pressed]": {
      ".indicator": {
        "&:before": {
          transform: "translateX(90%)",
        },
      },
    },
  },

  // When tab selected
  "&[data-focus-visible] .indicator": {
    outline: "2px solid blue",
    outlineOffset: "2px",
  },
}));
