import styled from "styled-components";
import { device } from "../../../design/breakpoints";

export const StyledStatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-evenly;
  padding-bottom: 2rem;
  padding-top: 1rem;

  @media ${device.tablet} {
    justify-content: start;
    gap: 5rem;
    padding: 2rem;
  }
`;
