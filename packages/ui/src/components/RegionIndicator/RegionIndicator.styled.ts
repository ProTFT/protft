import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledRegionText = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.4em;
  text-align: left;
  text-transform: uppercase;
  color: ${colors.white};

  @media ${device.tablet} {
    font-size: 15px;
    line-height: 38px;
  }
`;
