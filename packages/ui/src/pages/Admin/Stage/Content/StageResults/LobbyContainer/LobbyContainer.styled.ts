import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../../../../design/colors";

export const StyledTournamentPlayerListSmaller = styled(
  StyledVerticalContainer
)`
  border: 0.2rem solid ${colors.yellow};
  border-radius: 0.2rem;
  padding: 1.5rem;
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

export const StyledDeleteButton = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
  color: red;
  cursor: pointer;
`;

export const StyledResultInput = styled.input`
  width: 1rem;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export const StyledResultsInputContainer = styled(StyledHorizontalContainer)`
  gap: 1rem;
`;

export const StyledFakeTable = styled(StyledHorizontalContainer)`
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
`;
