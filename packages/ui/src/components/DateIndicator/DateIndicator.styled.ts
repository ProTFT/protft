import styled from "styled-components";
import { colors } from "../../design/colors";
import { StyledHorizontalContainer } from "../Layout/HorizontalContainer/HorizontalContainer.styled";

export const StyledDateText = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledContainer = styled(StyledHorizontalContainer)`
  gap: 0.5rem;
  align-items: center;
`;
