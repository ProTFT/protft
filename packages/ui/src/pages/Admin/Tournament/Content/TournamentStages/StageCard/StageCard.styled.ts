import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../../../../design/colors";

export const StyledStageCard = styled.div`
  background-color: ${colors.deepPurple};
  padding: 2rem;
  border-radius: 8px;
`;

export const StyledTitle = styled.p`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledInfo = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-align: left;
  color: ${colors.anotherGray};
`;

export const StyledBar = styled(StyledHorizontalContainer)`
  gap: 1rem;
`;

export const StyledInfoContainer = styled(StyledVerticalContainer)`
  gap: 0.5rem;
  padding: 0.5rem;
`;
