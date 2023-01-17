import styled, { css } from "styled-components";
import { colors } from "../../../../design/colors";

export const StyledContainer = styled.div<{ show: boolean }>`
  ${({ show }) => css`
    visibility: ${show ? "visible" : "hidden"};
    background-color: green;
    color: ${colors.blackBackground};
    font-family: Roboto;
    text-align: center;
    border-radius: 8px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 85%;
    top: 5%;

    ${show &&
    `-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;`}

    @-webkit-keyframes fadein {
      from {
        left: 100%;
        opacity: 0;
      }
      to {
        left: 85%;
        opacity: 1;
      }
    }

    @keyframes fadein {
      from {
        left: 100%;
        opacity: 0;
      }
      to {
        left: 85%;
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeout {
      from {
        left: 85%;
        opacity: 1;
      }
      to {
        left: 100%;
        opacity: 0;
      }
    }

    @keyframes fadeout {
      from {
        left: 85%;
        opacity: 1;
      }
      to {
        left: 100%;
        opacity: 0;
      }
    }
  `}
`;
