import styled from "styled-components";
import { ProTFTButton } from "../../../components/Button/Button";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../design/colors";

export const StyledContainer = styled(StyledVerticalContainer)`
  padding: 2rem;
  align-items: center;
`;

export const StyledLoginForm = styled(StyledVerticalContainer)`
  background-color: ${colors.darkPurple};
  padding: 2rem;
  border-radius: 1rem;
  gap: 1rem;
  width: 30%;
`;

export const StyledText = styled.p`
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-align: left;
`;

export const StyledInput = styled.input`
  height: 1.5rem;
  width: 100%;
`;

export const StyledButton = styled(ProTFTButton)``;
