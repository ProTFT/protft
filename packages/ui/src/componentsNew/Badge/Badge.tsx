import { ReactElement } from "react";
import { BadgeContainer, BadgeIcon, BadgeText } from "./Badge.styled";

interface BadgeProps {
  icon?: ReactElement;
  textColor?: string;
  color?: string;
  className?: string;
  tooltip?: string;
}

export const Badge = ({
  icon,
  textColor,
  children,
  color,
  className,
  tooltip,
}: React.PropsWithChildren<BadgeProps>) => {
  return (
    <BadgeContainer title={tooltip} className={className} color={color}>
      {icon && <BadgeIcon>{icon}</BadgeIcon>}
      <BadgeText textColor={textColor}>{children}</BadgeText>
    </BadgeContainer>
  );
};
