import styled from "styled-components";
import { StyledVerticalContainer } from "../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../../design/colors";

export const StyledTournamentPlayerList = styled(StyledVerticalContainer)`
  border: 0.2rem solid ${colors.yellow};
  border-radius: 0.2rem;
  padding: 2rem;
  height: 100%;
  width: 100%;
  min-height: 20rem;
`;

export const StyledTournamentPlayerListColumn = styled(StyledVerticalContainer)`
  width: 33%;
  flex-wrap: wrap;
  max-height: 50rem;
  gap: 0.5rem;
`;
