import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";

export const StreamList = styled.ul(({ theme }) => ({
  color: theme.colors.yellow,
  margin: 0,
  width: "50%",
}));

export const StreamListItem = styled.li(({ theme }) => ({
  display: "flex",
  padding: "2rem",
  gap: "1rem",
  backgroundColor: theme.colors.darkPurple,
  marginTop: "1rem",
  justifyContent: "space-between",
}));

export const ButtonBar = styled(StyledHorizontalContainer)((_) => ({
  justifyContent: "flex-end",
  padding: "2rem",
}));

export const ListContainer = styled(StyledHorizontalContainer)((_) => ({
  padding: "2rem",
  justifyContent: "space-around",
}));
