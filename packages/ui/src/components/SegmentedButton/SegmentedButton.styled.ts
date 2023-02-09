import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { StyledHorizontalContainer } from "../Layout/HorizontalContainer/HorizontalContainer.styled";

export const StyledButtonContainer = styled(StyledHorizontalContainer)`
  width: 100%;
  justify-content: end;

  @media ${device.tablet} {
    width: auto;
  }
`;
