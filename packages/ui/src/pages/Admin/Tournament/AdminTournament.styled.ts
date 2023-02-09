import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../design/colors";

export const StyledActionsContainer = styled(StyledHorizontalContainer)`
  background-color: ${colors.pitchBlack};
  justify-content: end;
  padding: 2rem;
  gap: 1rem;
`;

export const StyledBar = styled(StyledHorizontalContainer)`
  justify-content: space-between;
  background-color: ${colors.pitchBlack};
`;
