import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../../design/colors";
import { StyledButton } from "../../TournamentWizard/TournamentWizard.styled";

export const StyledAddTournamentDialog = styled.dialog`
  background-color: ${colors.darkPurple};
  border: none;
  border-radius: 5%;
`;

export const StyledFullWidthButton = styled(StyledButton)`
  width: 100%;
`;

export const StyledInactiveButton = styled(StyledFullWidthButton)`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
`;

export const StyledActionButtons = styled(StyledHorizontalContainer)`
  justify-content: space-between;
  gap: 2rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
`;
