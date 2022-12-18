import styled from "styled-components";
import { ButtonProps, ButtonVariant } from "./Button";

type StyledButtonProps = Pick<ButtonProps, "buttonColor" | "variant" | "width">;

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => props.buttonColor};
  padding: 8px 26px;

  width: ${(props) => props.width};

  ${(props) =>
    props.variant === ButtonVariant.Transparent &&
    `
      border: 1px solid #E0E0E0;
  `}
`;

type StyledButtonTextProps = Pick<ButtonProps, "textColor">;

export const StyledButtonText = styled.p<StyledButtonTextProps>`
  font-family: Roboto;
  font-weight: 800;
  size: 10px;
  line-height: 24px;
  letter-spacing: 0.25em;
  color: ${(props) => props.textColor};
  text-transform: uppercase;
`;
