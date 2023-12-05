import styled from "styled-components";

export const StyledTournamentPlayerListSmaller = styled.div(({ theme }) => ({
  border: `0.2rem solid ${theme.colors.yellow}`,
  display: "grid",
  padding: "1.5rem",
  borderRadius: "0.2rem",
}));

export const StyledLobbyName = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
`;

export const StyledTournamentPlayerListColumn = styled.div`
  flex-wrap: wrap;
  max-height: 50rem;
  gap: 0.5rem;
`;

export const StyledResultInput = styled.input`
  width: 2rem;
  height: 2rem;
  text-align: center;
  font-size: 16px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export const StyledResultsInputContainer = styled.div(() => ({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
}));

export const StyledFakeTable = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
}));
