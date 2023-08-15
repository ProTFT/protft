import styled from "styled-components";

export const FloatingButtonContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  margin: 0,
  padding: "0px 16px",
  backgroundColor: "rgb(244, 244, 244)",
  color: theme.colors.blackTiles,

  position: "fixed",
  right: "2em",
  bottom: "5em",
  borderRadius: "24px",
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px",
  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  cursor: "pointer",

  fontWeight: 500,
  fontSize: "0.875rem",
  lineHeight: 1.75,
  letterSpacing: "0.02857em",
  textTransform: "uppercase",
  minWidth: "48px",
  width: "auto",
  height: "48px",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: theme.colors.yellow,
  },

  "@media (min-width: 768px)": {
    bottom: "2em",
  },
}));
