import styled from "styled-components";

interface Props {
  size?: number;
  viewPort?: number;
  onClick?: () => void;
}

export const IconStyled = styled.svg.attrs(({ viewPort = 24 }: Props) => ({
  viewBox: `0 0 ${viewPort} ${viewPort}`,
  xmlns: "http://www.w3.org/2000/svg",
}))<Props>`
  ${({ size = 24 }) => `
    width: ${size}px;
    height: ${size}px;
  `}
  fill: none;
  ${({ onClick }) => onClick && `cursor: pointer;`}
`;
