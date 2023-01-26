import styled from "styled-components";
import { colors } from "../../../design/colors";

export const StyledListItem = styled.div<{ bgColor?: string }>`
  ${({ bgColor = colors.blackTiles }) => `
    border-radius: 8px;
    background-color: ${bgColor};
    box-shadow: 0px 12px 9px rgba(0, 0, 0, 0.25);
    display: flex;
    width: 100%;`}
`;
