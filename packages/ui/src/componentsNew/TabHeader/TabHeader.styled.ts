import styled from "styled-components";
import { TabHeaderVariant } from "./TabHeader";

interface TabHeaderContainerProps {
  numberOfOptions: number;
}

export const TabHeaderContainer = styled.div<TabHeaderContainerProps>(
  ({ numberOfOptions }) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${numberOfOptions}, 1fr)`,
    gridTemplateRows: "1fr",
  })
);

export const Tab = styled.button<{
  selected: boolean;
  // variant: TabHeaderVariant;
}>(({ theme, selected }) => ({
  display: "grid",
  padding: `${theme.spacing(0)} ${theme.spacing(15)} ${theme.spacing(
    4
  )} ${theme.spacing(15)}`,
  justifyContent: "center",
  alignItems: "center",
  borderBottom: `1.4px solid ${
    selected
      ? theme.colors.newDesign.primary
      : theme.colors.newDesign.grayScale[70]
  }`,
  backgroundColor: "transparent",
  color: theme.colors.newDesign.grayScale[10],
  cursor: "pointer",
  transition: "border-bottom ease-in 200ms",
  ":hover": {
    borderBottom: `1.4px solid ${
      selected
        ? theme.colors.newDesign.primary
        : theme.colors.newDesign.grayScale[10]
    }`,
  },

  "&.marked": {
    borderBottom: `1.4px solid ${theme.colors.newDesign.secondary}`,
    ":hover": {
      borderBottom: `1.4px solid ${
        selected
          ? theme.colors.newDesign.secondary
          : theme.colors.newDesign.grayScale[10]
      }`,
    },
  },

  "&.inactive": {
    borderBottom: `1.4px solid ${theme.colors.newDesign.grayScale[10]}`,
    opacity: 0.2,
    cursor: "default",
  },
}));
