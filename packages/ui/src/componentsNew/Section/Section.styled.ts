import styled from "styled-components";

interface OpenAwareProps {
  isOpen: boolean;
}

export const SectionContainer = styled.section(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
}));

export const SectionHeader = styled.header(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "0.8fr 2fr 0.1fr",
  gridTemplateRows: "repeat(1, 1fr)",
  padding: `${theme.spacing(13)} ${theme.spacing(23)}`,
  backgroundColor: theme.colors.newDesign.grayScale[95],
  alignItems: "center",
  borderRadius: `${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(
    0
  )} ${theme.spacing(0)}`,
}));

export const SectionTitle = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "0.2fr 1fr",
  alignItems: "center",
}));

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
