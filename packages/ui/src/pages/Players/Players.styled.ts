import styled from "styled-components";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledPlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media ${device.tablet} {
    padding-top: 2rem;
  }
`;

export const StyledContainer = styled(StyledVerticalContainer)`
  text-align: center;
  padding: 1rem;
  background-color: ${colors.blackBackground};
  gap: 1rem;

  @media ${device.desktop} {
    padding: 2rem 4rem 1rem 4rem;
  }
`;
