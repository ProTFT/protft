import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../../design/colors";

export const StyledField = styled(StyledHorizontalContainer)`
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
