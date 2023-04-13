import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { StyledVerticalContainer } from "../Layout/VerticalContainer/VerticalContainer.styled";

export const FilterWrapper = styled(StyledVerticalContainer)`
  @media ${device.desktop} {
    width: 100%;
    gap: 4rem;
    flex-direction: row;
  }
`;
