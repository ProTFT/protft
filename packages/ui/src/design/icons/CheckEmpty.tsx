import { colors } from "../colors";
import { IconStyled } from "./Icon.styled";
import { ClickableIconProps } from "./types";

export const CheckEmptyIcon = ({
  color = colors.white,
  onClick,
}: ClickableIconProps) => {
  // is mobile
  return (
    <IconStyled size={24} viewPort={32} onClick={onClick}>
      <circle cx="16" cy="16" r="8" stroke={color} strokeWidth="2" />
    </IconStyled>
  );
};
