import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../../design/colors";

export const StyledContainer = styled(StyledHorizontalContainer)`
  justify-content: space-between;
  background-color: ${colors.blackTiles};
  padding: 2rem;
  border-radius: 1rem;
`;

export const StyledText = styled.p`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
  color: ${colors.white};
`;
