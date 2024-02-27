import styled from "styled-components";
import { colors } from "../../../../design/colors";

export const PlayerBoard = styled.div(({ theme }) => ({
  display: "flex",
  border: `0.2rem solid ${colors.yellow}`,
  borderRadius: "0.2rem",
  padding: "2rem",
  minHeight: "34rem",
  maxHeight: "34rem",
  flexDirection: "column",
  flexWrap: "wrap",
  overflow: "auto",
  rowGap: "0.5rem",
  columnGap: "1rem",
}));
