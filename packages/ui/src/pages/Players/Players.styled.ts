import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledPlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media ${device.tablet} {
    padding: 2rem;
  }
`;
