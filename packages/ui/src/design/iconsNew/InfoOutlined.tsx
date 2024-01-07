import { IconStyled } from "../icons/Icon.styled";
import { ClickableIconProps } from "../icons/types";

export const InfoOutlined = ({
  color = "white",
  onClick,
  size,
}: ClickableIconProps) => {
  return (
    <IconStyled viewPort={size} size={size} onClick={onClick}>
      <path
        d="M19.6875 19.6875L19.7601 19.6512C20.7631 19.1497 21.8923 20.0556 21.6204 21.1435L20.3796 26.1065C20.1077 27.1944 21.2369 28.1003 22.2399 27.5988L22.3125 27.5625M36.75 21C36.75 29.6985 29.6985 36.75 21 36.75C12.3015 36.75 5.25 29.6985 5.25 21C5.25 12.3015 12.3015 5.25 21 5.25C29.6985 5.25 36.75 12.3015 36.75 21ZM21 14.4375H21.0131V14.4506H21V14.4375Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconStyled>
  );
};
