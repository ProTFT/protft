import styled, { css } from "styled-components";
import { device } from "../../design/breakpoints";

export const PageWrapperContainer = styled.div(
  ({ theme }) => css`
    @media ${device.desktop} {
      padding: ${theme.spacing(10)} ${theme.spacing(20)} ${theme.spacing(10)}
        ${theme.spacing(20)};
    }
  `
);
