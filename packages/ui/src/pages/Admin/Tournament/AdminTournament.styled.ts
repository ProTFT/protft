import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../design/colors";
import { StyledButton } from "../Home/AdminHome.styled";

export const StyledActionsContainer = styled(StyledHorizontalContainer)`
  background-color: ${colors.pitchBlack};
  justify-content: end;
  padding: 2rem;
  gap: 1rem;
`;

export const StyledActionButton = styled(StyledButton)``;
