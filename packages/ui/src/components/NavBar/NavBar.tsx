import React, { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../design/colors";
import { AboutIcon } from "../../design/icons/About";
import { PlayersIcon } from "../../design/icons/Players";
import { StatsIcon } from "../../design/icons/Stats";
import { TourneysIcon } from "../../design/icons/Tourneys";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useNavigation } from "../../hooks/useNavigation";
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
  link,
}: React.PropsWithChildren<{ icon: JSX.Element; link: string }>) => {
  const goTo = useNavigation(link);

  return (
    <StyledMobileNavBarItemContainer onClick={goTo}>
      {icon}
      {children}
    </StyledMobileNavBarItemContainer>
  );
};

const MobileMainButton = ({ link }: { link: string }) => {
  const goTo = useNavigation(link);

  return (
    <StyledMobileMainButton onClick={goTo}>
      <Logo height={25} width={40} color={colors.yellow} />
    </StyledMobileMainButton>
  );
};

export const MobileNavBar = () => {
  return (
    <StyledMobileContainer>
      <StyledMobileItemsContainer>
        <MobileNavBarItem link="tournaments" icon={<TourneysIcon />}>
          Tourneys
        </MobileNavBarItem>
        <MobileNavBarItem link="stats" icon={<StatsIcon />}>
          Stats
        </MobileNavBarItem>
      </StyledMobileItemsContainer>
      <MobileMainButton link="" />
      <StyledMobileItemsContainer>
        <MobileNavBarItem link="players" icon={<PlayersIcon />}>
          Players
        </MobileNavBarItem>
        <MobileNavBarItem link="about" icon={<AboutIcon />}>
          About
        </MobileNavBarItem>
      </StyledMobileItemsContainer>
    </StyledMobileContainer>
  );
};
