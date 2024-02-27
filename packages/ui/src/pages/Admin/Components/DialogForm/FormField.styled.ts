import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../../design/colors";

export const StyledField = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  color: theme.colors.white,
  fontFamily: "Roboto",
  fontSize: "18px",
  alignItems: "center",
  columnGap: "1rem",
}));

export const FieldLabel = styled.label(() => ({}));

export const StyledFieldOld = styled(StyledHorizontalContainer)`
  gap: 2rem;
  justify-content: space-between;
  color: ${colors.white};
  font-family: Roboto;
  font-size: 18px;
  align-items: center;
`;

export const StyledInput = styled.input`
  border: 2px solid black;
  border-radius: 4px;
  height: 1.5rem;
  padding: 1rem;
`;

export const StyledSelect = styled.select`
  border: 2px solid black;
  border-radius: 4px;
  height: 2rem;
`;
