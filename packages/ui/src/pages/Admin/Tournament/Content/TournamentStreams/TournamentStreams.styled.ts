import styled from "styled-components";

export const StreamListContainer = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "4fr 3fr 4fr",
  paddingBottom: "3rem",
}));

export const StreamList = styled.ul(({ theme }) => ({
  gridColumn: "2 / 3",
  color: theme.colors.yellow,
  margin: 0,
}));

export const StreamListItem = styled.li(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "3fr 1fr",
  padding: "2rem",
  backgroundColor: theme.colors.darkPurple,
  marginTop: "1rem",
  justifyContent: "space-between",
}));

export const StreamCardBody = styled.div(() => ({}));

export const StreamCardDeleteButton = styled.div(() => ({
  alignSelf: "start",
  justifySelf: "end",
}));
