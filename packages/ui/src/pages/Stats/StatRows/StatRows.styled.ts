import styled from "styled-components";
import { colors } from "../../../design/colors";

export const StyledPlayerRowData = styled.td<{ center?: boolean }>`
  ${({ center = true }) => `
    font-family: Roboto;
    font-size: 15px;
    font-weight: 600;
    line-height: 25px;
    letter-spacing: 0.1em;
    padding: 0.5rem;
    color: ${colors.white};
    ${center && `text-align: center;`}
  `}
`;
