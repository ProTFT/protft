import styled from "styled-components";
import { StyledVerticalContainer } from "../../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../../../../design/colors";

export const StyledTournamentPlayerListSmaller = styled(
  StyledVerticalContainer
)<{
  isComplete: boolean;
}>`
  border: 0.2rem solid
    ${({ isComplete }) => (isComplete ? colors.darkPurple : colors.yellow)};
  border-radius: 0.2rem;
  padding: 1.5rem;
  width: 40%;
  gap: 1rem;
`;

export const StyledLobbyName = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
`;

export const StyledTournamentPlayerListColumn = styled(StyledVerticalContainer)`
  flex-wrap: wrap;
  max-height: 50rem;
  gap: 0.5rem;
`;
