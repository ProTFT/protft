import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../design/colors";

export const StyledHeaderContainer = styled.header`
  display: flex;
  width: 100%;
  background-color: ${colors.otherBlack};
  box-shadow: 0px 12px 9px rgba(0, 0, 0, 0.25);
`;

export const StyledBar = styled(StyledHorizontalContainer)`
  justify-content: space-between;
  background-color: ${colors.pitchBlack};
`;
