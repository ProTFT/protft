import styled from "styled-components";

export const DryRunContainer = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  color: "white",
  padding: "1rem",
  li: {
    marginBottom: "0.5rem",
  },
}));

export const DryRunNewPlayers = styled.ul(() => ({
  listStyleType: "none",
  padding: "0rem",
}));

export const DryRunRepeatedPlayers = styled.ul(() => ({
  listStyleType: "none",
  padding: "0rem",
}));
