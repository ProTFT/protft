import React from "react";
import { colors } from "../../design/colors";
import { AboutIcon } from "../../design/icons/About";
import { PlayersIcon } from "../../design/icons/Players";
import { StatsIcon } from "../../design/icons/Stats";
import { TourneysIcon } from "../../design/icons/Tourneys";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Logo } from "../Logo/Logo";
import {
  StyledDesktopContainer,
  StyledDesktopItemsContainer,
  StyledMobileContainer,
  StyledMobileItemsContainer,
  StyledMobileMainButton,
  StyledMobileNavBarItemContainer,
} from "./NavBar.styled";
import { NavBarButton } from "./NavBarButton";

export const NavBar = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileNavBar /> : <DesktopNavBar />;
};

export const DesktopNavBar = () => {
  return (
    <StyledDesktopContainer>
      <Logo color={colors.yellow} width={67} height={38} />
      <StyledDesktopItemsContainer>
        <NavBarButton>Tourneys</NavBarButton>
        <NavBarButton>Players</NavBarButton>
        <NavBarButton>Stats</NavBarButton>
        <NavBarButton>About</NavBarButton>
      </StyledDesktopItemsContainer>
      <div />
    </StyledDesktopContainer>
  );
};

const MobileNavBarItem = ({
  children,
  icon,
}: React.PropsWithChildren<{ icon: JSX.Element }>) => {
  return (
    <StyledMobileNavBarItemContainer>
      {icon}
      {children}
    </StyledMobileNavBarItemContainer>
  );
};

export const MobileNavBar = () => {
  return (
    <StyledMobileContainer>
      <StyledMobileItemsContainer>
        <MobileNavBarItem icon={<TourneysIcon />}>Tourneys</MobileNavBarItem>
        <MobileNavBarItem icon={<StatsIcon />}>Stats</MobileNavBarItem>
      </StyledMobileItemsContainer>
      <StyledMobileMainButton>
        <Logo height={25} width={40} color={colors.yellow} />
      </StyledMobileMainButton>
      <StyledMobileItemsContainer>
        <MobileNavBarItem icon={<PlayersIcon />}>Players</MobileNavBarItem>
        <MobileNavBarItem icon={<AboutIcon />}>About</MobileNavBarItem>
      </StyledMobileItemsContainer>
    </StyledMobileContainer>
  );
};
