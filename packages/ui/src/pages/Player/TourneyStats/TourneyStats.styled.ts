import styled from "styled-components";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../../design/breakpoints";
import { colors } from "../../../design/colors";

export const StyledTourneyStatsContainer = styled(StyledVerticalContainer)`
  background-color: #191919;
  padding: 1rem;
  gap: 1rem;

  @media ${device.tablet} {
    margin-left: -4rem;
    margin-right: -4rem;
    padding: 4rem;
    gap: 2rem;
  }
`;

export const StyledTitle = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 32px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.yellow};
  margin-bottom: 2rem;
`;
