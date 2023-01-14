import styled from "styled-components";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../design/colors";

export const StyledContainer = styled(StyledVerticalContainer)`
  padding: 3rem;
`;

export const StyledButton = styled.button`
  background-color: ${colors.yellow};
  border-radius: 4px;
  font-size: 16px;
  padding: 0.8rem;
  text-align: center;
  font-family: Roboto;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
`;
