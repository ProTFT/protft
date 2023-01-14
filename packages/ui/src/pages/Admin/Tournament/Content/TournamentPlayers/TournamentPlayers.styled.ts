import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../../../design/colors";

export const StyledContainer = styled(StyledHorizontalContainer)`
  padding: 6rem;
  gap: 2rem;
  justify-content: space-between;
`;

export const StyledTournamentPlayerList = styled(StyledVerticalContainer)`
  border: 0.2rem solid ${colors.yellow};
  border-radius: 0.2rem;
  padding: 2rem;
  height: 100%;
  width: 100%;
  min-height: 20rem;
`;

export const StyledTournamentPlayerListSmaller = styled(
  StyledVerticalContainer
)`
  border: 0.2rem solid ${colors.yellow};
  border-radius: 0.2rem;
  padding: 2rem;
  height: 100%;
  width: 100%;
`;

export const StyledTournamentPlayerListColumn = styled(StyledVerticalContainer)`
  width: 33%;
  flex-wrap: wrap;
  max-height: 50rem;
  gap: 0.5rem;
`;

export const StyledPlayerName = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
`;

export const StyledPlayerContentContainer = styled(StyledHorizontalContainer)`
  cursor: grab;
  gap: 1rem;
  border: 0.05rem solid ${colors.gray};
  box-shadow: 0px 2px 4px rgba(255, 255, 255, 0.07);
  width: 100%;
  padding: 0rem 1rem 0rem 1rem;
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

export const StyledBar = styled(StyledHorizontalContainer)`
  justify-content: space-between;
`;

export const StyledButton = styled.button`
  cursor: pointer;
`;
