import styled from "styled-components";
import { StyledVerticalContainer } from "../../../../components/Layout/VerticalContainer/VerticalContainer.styled";

export const StyledLeftSide = styled(StyledVerticalContainer)`
  position: sticky;
  height: auto;
  top: 0px;
  gap: 0.5rem;
  justify-content: flex-start;
  min-width: 25%;
  min-height: 50rem;
  padding-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const StyledRightSide = styled(StyledVerticalContainer)`
  min-width: 60%;
  gap: 0.5rem;
`;
