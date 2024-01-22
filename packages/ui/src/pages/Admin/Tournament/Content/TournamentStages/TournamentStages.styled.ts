import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";

export const StyledContainer = styled(StyledVerticalContainer)`
  padding: 2rem;
`;

export const StyledStagesContainer = styled.div(() => ({
  padding: "2rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "1rem",
}));

export const StyledButtonBar = styled(StyledHorizontalContainer)`
  justify-content: flex-end;
  padding: 2rem;
`;
