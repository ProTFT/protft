import styled from "styled-components";
import { StyledVerticalContainer } from "../Layout/VerticalContainer/VerticalContainer.styled";

export const DropdownContainer = styled(StyledVerticalContainer)(
  ({ theme }) => ({
    position: "absolute",
    zIndex: 1,
    width: "100%",
  })
);

export const Button = styled.button(({ theme }) => ({
  backgroundColor: theme.colors.blackTiles,
  color: "white",
  cursor: "pointer",
  fontFamily: "Roboto",
  fontSize: "13px",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  ":hover": {
    backgroundColor: "gray",
  },
}));

export const FilterContainer = styled.div(({ theme }) => ({
  position: "relative",
  display: "inline-block",
}));
