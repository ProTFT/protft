import styled from "styled-components";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledContainer = styled(StyledVerticalContainer)`
  text-align: center;
  padding: 1rem;
  background-color: ${colors.blackBackground};
  gap: 2rem;

  @media ${device.desktop} {
    padding: 2rem 4rem 1rem 4rem;
  }
`;

export const StyledBar = styled(StyledVerticalContainer)`
  gap: 2rem;
  align-items: center;

  @media ${device.tablet} {
    padding-right: 2rem;
    flex-direction: row;
    justify-content: space-between;
  }
`;
