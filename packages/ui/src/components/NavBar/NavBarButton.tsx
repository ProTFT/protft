import React from "react";
import { StyledNavBarButton } from "./NavBarButton.styled";

type Props = React.PropsWithChildren<{ selected: boolean }>;

export const NavBarButton = ({ children, selected }: Props) => {
  return (
    <StyledNavBarButton selected={selected}>{children}</StyledNavBarButton>
  );
};
