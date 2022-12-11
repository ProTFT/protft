import React from "react";
import { StyledNavBarButton } from "./NavBarButton.styled";

type Props = React.PropsWithChildren<{}>;

export const NavBarButton = ({ children }: Props) => {
  return <StyledNavBarButton>{children}</StyledNavBarButton>;
};
