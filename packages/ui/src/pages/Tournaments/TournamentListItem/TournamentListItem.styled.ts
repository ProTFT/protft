import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";

export const StyledListItem = styled(StyledHorizontalContainer)<{
  bgColor?: string;
}>`
  ${({ theme, bgColor = theme.colors.blackTiles }) => `
    border-radius: 8px;
    background-color: ${bgColor};
    box-shadow: 0px 12px 9px rgba(0, 0, 0, 0.25);
    width: 100%;
  `}
`;
