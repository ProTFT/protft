import styled from "styled-components";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../../design/breakpoints";

export const StyledTournamentList = styled(StyledVerticalContainer)`
  gap: 1rem;

  @media ${device.tablet} {
    padding: 2rem;
  }
`;
