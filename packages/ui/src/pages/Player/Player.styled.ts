import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledPageContainer = styled.div`
  background-color: ${colors.blackBackground};
  padding: 0rem;

  @media ${device.tablet} {
    padding: 4rem;
  }
`;
