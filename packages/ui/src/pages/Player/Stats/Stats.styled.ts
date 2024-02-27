import styled from "styled-components";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../../design/breakpoints";

export const StyledStatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-evenly;
  padding-bottom: 2rem;
  padding-top: 1rem;

  @media ${device.tablet} {
    justify-content: center;
    gap: 5rem;
    padding-left: 2rem;
  }

  @media ${device.desktop} {
    flex-direction: row;
  }
`;

export const StyledStatsSection = styled(StyledVerticalContainer)(
  ({ theme }) => ({})
);

export const SetFilterContainer = styled.div(({ theme }) => ({
  paddingTop: "1rem",
}));
