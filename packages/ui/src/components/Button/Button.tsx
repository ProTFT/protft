import React from "react";
import { colors } from "../../design/colors";
import { StyledButton, StyledButtonText } from "./Button.styled";

export enum ButtonVariant {
  Primary,
  Transparent,
}

export interface ButtonProps {
  buttonColor?: string;
  textColor?: string;
  variant?: ButtonVariant;
  width?: string;
}

export const ProTFTButton = ({
  buttonColor = colors.yellow,
  textColor = colors.pitchBlack,
  variant = ButtonVariant.Primary,
  width = "auto",
  children,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton variant={variant} buttonColor={buttonColor} width={width}>
      <StyledButtonText textColor={textColor}>{children}</StyledButtonText>
    </StyledButton>
  );
};
