import styled from "styled-components";
import { Switch } from "react-aria-components";

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  // ".react-aria-Switch": {
  display: "flex",
  alignItems: "center",
  gap: "0.571rem",
  fontSize: "1.143rem",
  color: "white",
  forcedColorAdjust: "none",

  ".indicator": {
    width: "3rem",
    height: "4rem",
    background: theme.colors.newDesign.secondary,
    borderRadius: theme.spacing(8),
    transition: "all 200ms",

    "&:before": {
      content: "'lalalTest'",
      display: "block",
      margin: "0.143rem 0.143rem 0.143rem 0.143rem",
      width: "0.857rem",
      height: "0.857rem",
      background: "white",
      borderRadius: "16px",
      transition: "all 200ms",
    },
  },

  "&[data-pressed] .indicator": {
    borderColor: "pink",

    "&:before": {
      background: "purple",
    },
  },

  "&[data-selected]": {
    ".indicator": {
      borderColor: "gray",
      background: "brown",

      "&:before": {
        background: "white",
        transform: "translateX(100%)",
      },
    },

    "&[data-pressed]": {
      ".indicator": {
        borderColor: "pink",
        background: "purple",
      },
    },
  },

  "&[data-focus-visible] .indicator": {
    outline: "2px solid blue",
    outlineOffset: "2px",
  },
  // },
}));
