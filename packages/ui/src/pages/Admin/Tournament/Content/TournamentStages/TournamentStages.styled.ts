import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";

export const StyledContainer = styled(StyledVerticalContainer)`
  padding: 2rem;
`;

export const StyledStagesContainer = styled(StyledHorizontalContainer)`
  padding: 2rem;
  justify-content: space-around;
`;

export const StyledButtonBar = styled(StyledHorizontalContainer)`
  justify-content: flex-end;
  padding: 2rem;
`;
