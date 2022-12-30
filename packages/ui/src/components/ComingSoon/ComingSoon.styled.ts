import styled from "styled-components";
import { colors } from "../../design/colors";
import { StyledHorizontalContainer } from "../Layout/HorizontalContainer/HorizontalContainer.styled";

export const StyledContainer = styled(StyledHorizontalContainer)`
  padding: 5rem;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 30%;
  margin-bottom: 30%;
`;

export const StyledText = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 48px;
  font-weight: 400;
  line-height: 60px;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.yellow};
`;
