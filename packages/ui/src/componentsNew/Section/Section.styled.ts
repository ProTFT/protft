import styled from "styled-components";
import { Badge } from "../Badge/Badge";
import { SectionProps } from "./Section";

interface OpenAwareProps {
  isOpen: boolean;
}

export const SectionContainer = styled.section(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
}));

export const SectionHeader = styled.header<Pick<SectionProps, "disabled">>(
  ({ theme, disabled }) => ({
    display: "grid",
    gridTemplateColumns: "0.8fr 2fr 0.1fr",
    gridTemplateRows: "repeat(1, 1fr)",
    padding: `${theme.spacing(13)} ${theme.spacing(23)}`,
    backgroundColor: theme.colors.newDesign.grayScale[95],
    alignItems: "center",
    borderRadius: `${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(
      0
    )} ${theme.spacing(0)}`,

    ...(disabled
      ? {
          backgroundColor: theme.colors.newDesign.grayScale[80],
        }
      : {}),
  })
);

export const SectionTitle = styled.div<Pick<SectionProps, "disabled">>(
  ({ disabled, theme }) => ({
    display: "grid",
    gridTemplateColumns: "0.2fr 1fr",
    alignItems: "center",
    ...(disabled
      ? {
          svg: {
            path: {
              fill: theme.colors.newDesign.grayScale[70],
            },
          },
          p: {
            color: theme.colors.newDesign.grayScale[70],
          },
        }
      : {}),
  })
);

export const SectionHeaderControls = styled.div(() => ({
  display: "grid",
  gridColumn: "2",
  justifyContent: "end",
}));

export const SectionCollapseButton = styled.div<OpenAwareProps>(
  ({ isOpen }) => ({
    display: "grid",
    justifyContent: "end",
    svg: {
      rotate: isOpen ? "0" : "180deg",
      transition: "rotate 200ms ease-in-out",
    },
  })
);

export const SectionCollapsible = styled.div<OpenAwareProps>(
  ({ theme, isOpen }) => ({
    backgroundColor: theme.colors.newDesign.grayScale[80],
    maxHeight: isOpen ? "1000vh" : 0,
    visibility: isOpen ? "visible" : "hidden",
    transition: "max-height ease-in 300ms, visibility 100ms linear",
    overflow: "hidden",
    borderRadius: `${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(
      5
    )} ${theme.spacing(5)}`,

    "&.open": {
      transition: "max-height ease-in 300ms, visibility 100ms linear 300ms",
    },
  })
);

export const SectionBody = styled.div(({ theme }) => ({
  padding: `${theme.spacing(20)} ${theme.spacing(23)}`,
}));

export const SectionNoDataBadge = styled(Badge)(({ theme }) => ({
  opacity: "100%",
}));
