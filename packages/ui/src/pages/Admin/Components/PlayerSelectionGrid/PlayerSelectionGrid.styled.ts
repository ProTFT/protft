import styled from "styled-components";

export const GridContainer = styled.div(({ theme }) => ({
  display: "grid",
  marginTop: "4rem",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "2fr 5fr",
  columnGap: "1rem",
  paddingLeft: "2rem",
  paddingRight: "2rem",
}));

export const GridLeftSide = styled.div(() => ({
  minHeight: "60rem",
}));

export const GridRightSide = styled.div(() => ({}));
