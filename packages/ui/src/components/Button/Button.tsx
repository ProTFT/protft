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
  onClick?: (...parameters: any) => Promise<void> | void;
  type?: "submit" | "button";
}

export const ProTFTButton = ({
  buttonColor = colors.yellow,
  textColor = colors.pitchBlack,
  variant = ButtonVariant.Primary,
  width = "auto",
  onClick,
  children,
  type = "button",
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      buttonColor={buttonColor}
      width={width}
      type={type}
    >
      <StyledButtonText textColor={textColor}>{children}</StyledButtonText>
    </StyledButton>
  );
};
