import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledMobileContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 3rem;
  width: 100%;
  background: ${colors.navBarBlack};
  display: flex;
  justify-content: space-between;
  z-index: 99;
`;

export const StyledMobileItemsContainer = styled.div`
  width: 42.5%;
  display: flex;
  justify-content: space-around;
`;

export const StyledMobileMainButton = styled.div`
  position: absolute;
  width: 4rem;
  height: 4rem;
  left: 42%;
  bottom: 1rem;
  background: ${colors.pitchBlack};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledDesktopContainer = styled.div`
  background-color: ${colors.pitchBlack};
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;

  @media ${device.desktop} {
    padding-left: 5rem;
    padding-right: 5rem;
  }
`;

export const StyledDesktopItemsContainer = styled.div`
  display: flex;
  gap: 5rem;
`;

export const StyledMobileNavBarItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  font-family: "Roboto";
  font-size: 8px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.5em;
  text-align: center;
  text-transform: uppercase;
  color: #f2f2f2;
`;
