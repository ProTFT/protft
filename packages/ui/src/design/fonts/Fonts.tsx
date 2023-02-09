import styled, { CSSProperties, StyledComponent } from "styled-components";
import { colors } from "../colors";

export const StyledTitle = styled.p<CSSProperties>`
  ${({ fontSize, fontWeight, lineHeight, letterSpacing, textAlign, color }) => `
    font-family: VTF Redzone Classic;
    font-size: ${fontSize || "48px"};
    font-weight: ${fontWeight || "400"};
    line-height: ${lineHeight || "60px"};
    letter-spacing: ${letterSpacing || "0.25em"};
    text-align: ${textAlign || "left"};
    color: ${color || colors.yellow};
  `}
`;

export const StyledBody = styled.p<CSSProperties>`
  ${({ fontSize, fontWeight, lineHeight, letterSpacing, textAlign, color }) => `
    font-family: Roboto;
    font-size: ${fontSize || "15px"};
    font-weight: ${fontWeight || "700"};
    line-height: ${lineHeight || "38px"};
    letter-spacing: ${letterSpacing || "0.1em"};
    text-align: ${textAlign || "left"};
    color: ${color || colors.white};
`}
`;

interface Props {
  variant: Variant;
  props: any;
}

enum Variant {
  Title,
  Body,
}

const variantToComponent: {
  [key in Variant]: StyledComponent<"p", any>;
} = {
  [Variant.Title]: StyledTitle,
  [Variant.Body]: StyledBody,
};

export const Typography = ({ variant, props }: Props) => {
  return variantToComponent[variant](props);
};

const titleFont = "VTF Redzone Classic";
export const TITLE_FONT_FAMILY = `font-family: ${titleFont};`;
