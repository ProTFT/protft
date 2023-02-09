import styled from "styled-components";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";

export const StyledContainer = styled(StyledVerticalContainer)`
  ${({ theme }) => `
    background-color: ${theme.colors.blackBackground};  
  `}
`;
