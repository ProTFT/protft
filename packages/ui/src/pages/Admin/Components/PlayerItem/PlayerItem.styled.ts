import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../../design/colors";

export const StyledPlayerContentContainer = styled(StyledHorizontalContainer)`
  cursor: grab;
  gap: 1rem;
  border: 0.05rem solid ${colors.gray};
  box-shadow: 0px 2px 4px rgba(255, 255, 255, 0.07);
  width: 100%;
  padding: 0rem 1rem 0rem 1rem;
`;

export const StyledPlayerName = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
`;
