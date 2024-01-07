import { IconStyled } from "../icons/Icon.styled";
import { ClickableIconProps } from "../icons/types";

export const StatsOutlined = ({
  color = "white",
  onClick,
  size,
}: ClickableIconProps) => {
  return (
    <IconStyled viewPort={size} size={size} onClick={onClick}>
      <path
        d="M5.25 22.9688C5.25 21.8814 6.13144 21 7.21875 21H11.1562C12.2436 21 13.125 21.8814 13.125 22.9688V34.7812C13.125 35.8686 12.2436 36.75 11.1562 36.75H7.21875C6.13144 36.75 5.25 35.8686 5.25 34.7812V22.9688Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0625 15.0937C17.0625 14.0064 17.9439 13.125 19.0312 13.125H22.9688C24.0561 13.125 24.9375 14.0064 24.9375 15.0938V34.7812C24.9375 35.8686 24.0561 36.75 22.9688 36.75H19.0312C17.9439 36.75 17.0625 35.8686 17.0625 34.7812V15.0937Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.875 7.21875C28.875 6.13144 29.7564 5.25 30.8438 5.25H34.7812C35.8686 5.25 36.75 6.13144 36.75 7.21875V34.7812C36.75 35.8686 35.8686 36.75 34.7812 36.75H30.8438C29.7564 36.75 28.875 35.8686 28.875 34.7812V7.21875Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconStyled>
  );
};
