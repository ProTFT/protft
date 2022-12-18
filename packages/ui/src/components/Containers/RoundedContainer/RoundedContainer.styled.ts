import styled from "styled-components";
import { colors } from "../../../design/colors";
import { RoundedContainerProps } from "./RoundedContainer";

export const StyledRoundedContainer = styled.div<RoundedContainerProps>`
  ${({
    color = colors.darkPurple,
    padding = "1.5rem 1.5rem 0.5rem 1.5rem",
    gap = "0rem",
  }) => `
    width: 100%;
    border-radius: 16px;
    padding: ${padding};
    background-color: ${color};
    display: flex;
    flex-direction: column;
    gap: ${gap};
  `}
`;
