import styled from "styled-components";
import { device } from "../../../design/breakpoints";
import { colors } from "../../../design/colors";
import { StyledVerticalContainer } from "../../Layout/VerticalContainer/VerticalContainer.styled";
import { RoundedContainerProps } from "./RoundedContainer";

export const StyledRoundedContainer = styled(
  StyledVerticalContainer
)<RoundedContainerProps>`
  ${({
    color = colors.darkPurple,
    padding = "1.5rem 1.5rem 0.5rem 1.5rem",
    gap = "0rem",
  }) => `
    width: 100%;
    border-radius: 16px;
    padding: ${padding};
    background-color: ${color};
    gap: ${gap};

    @media ${device.tablet} {
      flex-direction: row;
      justify-content: space-between;
    }
  `}
`;
