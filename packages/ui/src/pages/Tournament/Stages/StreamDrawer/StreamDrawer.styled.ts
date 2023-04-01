import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../../design/colors";
import { StyledBody, StyledTitle } from "../../../../design/fonts/Fonts";

export const StyledStreamContainer = styled(StyledHorizontalContainer)`
  gap: 1rem;
  align-items: center;
  align-content: center;
`;

export const StyledDrawerTitle = styled(StyledTitle).attrs({
  color: colors.yellow,
})`
  font-size: 36px;
`;

export const StyledStreamName = styled(StyledBody)`
  font-size: 24px;
`;
