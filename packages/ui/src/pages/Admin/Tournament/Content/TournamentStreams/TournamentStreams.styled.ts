import styled from "styled-components";

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
