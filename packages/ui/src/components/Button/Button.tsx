import React from "react";
import { colors } from "../../design/colors";
import { StyledButton, StyledButtonText } from "./Button.styled";

export interface ButtonProps {
  buttonColor?: string;
  textColor?: string;
}

export const ProTFTButton = ({
  buttonColor = colors.yellow,
  textColor = colors.pitchBlack,
  children,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton buttonColor={buttonColor}>
      <StyledButtonText textColor={textColor}>{children}</StyledButtonText>
    </StyledButton>
  );
};
