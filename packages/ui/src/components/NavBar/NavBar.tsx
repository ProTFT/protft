import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { colors } from "../../design/colors";
import { AboutIcon } from "../../design/icons/About";
import { PlayersIcon } from "../../design/icons/Players";
import { StatsIcon } from "../../design/icons/Stats";
import { TourneysIcon } from "../../design/icons/Tourneys";
import { useAuth } from "../../hooks/useAuth";
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

interface Props {
  selectedMenu: MenuItems | null;
}

enum MenuItems {
  tournament,
  calendar,
  players,
  stats,
  about,
}

const selectedMenuMap: { [urlText: string]: MenuItems } = {
  tournament: MenuItems.tournament,
  calendar: MenuItems.calendar,
  player: MenuItems.players,
  stats: MenuItems.stats,
  about: MenuItems.about,
};

const getSelectedMenu = (url: string) => {
  const selectedMenu = Object.keys(selectedMenuMap).find((urlPath) =>
    url.includes(urlPath)
  );
  if (!selectedMenu) {
    return null;
  }
  return selectedMenuMap[selectedMenu];
};

export const NavBar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const selectedMenu = useMemo(
    () => getSelectedMenu(location.pathname),
    [location.pathname]
  );
  return isMobile ? (
    <MobileNavBar selectedMenu={selectedMenu} />
  ) : (
    <DesktopNavBar selectedMenu={selectedMenu} />
  );
};

export const DesktopNavBar = ({ selectedMenu }: Props) => {
  const { user } = useAuth();
  return (
    <StyledDesktopContainer>
      {!user && (
        <>
          <Link to={"/"}>
            <Logo color={colors.yellow} width={67} height={38} />
          </Link>
          <StyledDesktopItemsContainer>
            <Link to={"/tournaments"}>
              <NavBarButton selected={selectedMenu === MenuItems.tournament}>
                Tourneys
              </NavBarButton>
            </Link>
            <Link to={"/calendar"}>
              <NavBarButton selected={selectedMenu === MenuItems.calendar}>
                Calendar
              </NavBarButton>
            </Link>
            <Link to={"/players"}>
              <NavBarButton selected={selectedMenu === MenuItems.players}>
                Players
              </NavBarButton>
            </Link>
            <Link to={"/stats"}>
              <NavBarButton selected={selectedMenu === MenuItems.stats}>
                Stats
              </NavBarButton>
            </Link>
            <Link to={"/about"}>
              <NavBarButton selected={selectedMenu === MenuItems.about}>
                About
              </NavBarButton>
            </Link>
            {user && (
              <Link to={"/logout"}>
                <NavBarButton selected={false}>Logout</NavBarButton>
              </Link>
            )}
          </StyledDesktopItemsContainer>
        </>
      )}
      {user && (
        <>
          <Link to={"/admin/tournaments"}>
            <Logo color={colors.yellow} width={67} height={38} />
          </Link>
          <StyledDesktopItemsContainer>
            <Link to={"/admin/tournaments"}>
              <NavBarButton selected={selectedMenu === MenuItems.tournament}>
                Tourneys
              </NavBarButton>
            </Link>
            <Link to={"/admin/players"}>
              <NavBarButton selected={selectedMenu === MenuItems.players}>
                Players
              </NavBarButton>
            </Link>
            <Link to={"/logout"}>
              <NavBarButton selected={false}>Logout</NavBarButton>
            </Link>
          </StyledDesktopItemsContainer>
        </>
      )}
      <div />
    </StyledDesktopContainer>
  );
};

export const MobileNavBar = ({ selectedMenu }: Props) => {
  return (
    <StyledMobileContainer>
      <StyledMobileItemsContainer>
        <MobileNavBarItem
          selected={selectedMenu === MenuItems.tournament}
          link="tournaments"
          icon={
            <TourneysIcon
              color={
                selectedMenu === MenuItems.tournament
                  ? colors.yellow
                  : undefined
              }
            />
          }
        >
          Tourneys
        </MobileNavBarItem>
        <MobileNavBarItem
          selected={selectedMenu === MenuItems.stats}
          link="stats"
          icon={
            <StatsIcon
              color={
                selectedMenu === MenuItems.stats ? colors.yellow : undefined
              }
            />
          }
        >
          Stats
        </MobileNavBarItem>
      </StyledMobileItemsContainer>
      <MobileMainButton link="" />
      <StyledMobileItemsContainer>
        <MobileNavBarItem
          selected={selectedMenu === MenuItems.players}
          link="players"
          icon={
            <PlayersIcon
              color={
                selectedMenu === MenuItems.players ? colors.yellow : undefined
              }
            />
          }
        >
          Players
        </MobileNavBarItem>
        <MobileNavBarItem
          selected={selectedMenu === MenuItems.about}
          link="about"
          icon={
            <AboutIcon
              color={
                selectedMenu === MenuItems.about ? colors.yellow : undefined
              }
            />
          }
        >
          About
        </MobileNavBarItem>
      </StyledMobileItemsContainer>
    </StyledMobileContainer>
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

const MobileNavBarItem = ({
  children,
  icon,
  link,
  selected,
}: React.PropsWithChildren<{
  icon: JSX.Element;
  link: string;
  selected: boolean;
}>) => {
  const goTo = useNavigation(link);

  return (
    <StyledMobileNavBarItemContainer selected={selected} onClick={goTo}>
      {icon}
      {children}
    </StyledMobileNavBarItemContainer>
  );
};
