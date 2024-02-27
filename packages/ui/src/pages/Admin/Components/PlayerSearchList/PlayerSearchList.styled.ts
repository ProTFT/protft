import styled from "styled-components";

export const SearchListContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "0.5rem 0.5rem 0.5rem 1rem",
}));

export const SearchListHeader = styled.header(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const SearchListBody = styled.ul(({ theme }) => ({
  listStyleType: "none",
  padding: "0rem",
}));

export const SearchListEntry = styled.li(({ theme }) => ({
  marginBottom: "0.5rem",
}));
