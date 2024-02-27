import styled from "styled-components";

export const BoardListContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "0.5rem 0.5rem 0.5rem 1rem",
}));

export const BoardListHeader = styled.header(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const BoardListButtons = styled.div(({ theme }) => ({
  display: "flex",
  gap: "0.5rem",
}));

export const BoardListBody = styled.ul(({ theme }) => ({
  listStyleType: "none",
  padding: "0rem",
}));
