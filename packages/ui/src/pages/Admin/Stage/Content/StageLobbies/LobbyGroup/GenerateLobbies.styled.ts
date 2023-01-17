import styled from "styled-components";
import { StyledVerticalContainer } from "../../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../../../../design/colors";

export const StyledContainer = styled(StyledVerticalContainer)`
  justify-content: center;
  align-items: center;
  padding: 3rem;
  gap: 1rem;
`;

export const StyledText = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledInput = styled.input`
  padding: 0.5rem;
`;
