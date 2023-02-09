import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../../design/breakpoints";
import { colors } from "../../../design/colors";

export const StyledHeaderContainer = styled(StyledHorizontalContainer)`
  display: flex;
  width: 100%;
  background-color: ${colors.otherBlack};
  box-shadow: 0px 12px 9px rgba(0, 0, 0, 0.25);

  @media ${device.tablet} {
    border-radius: 8px;
  }
`;

export const StyledPlayerImage = styled.div`
  width: 40%;
  height: 10rem;
  background-image: url("/no_pic.webp");
  background-size: cover;

  @media ${device.tablet} {
    width: 20%;
    height: 15rem;
    border-radius: 8px 0px 0px 8px;
  }
`;

export const StyledPlayerInfo = styled(StyledVerticalContainer)`
  padding: 1rem;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  @media ${device.tablet} {
    padding: 3rem;
  }
`;

export const StyledPlayerName = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-align: left;
  text-transform: uppercase;
  color: ${colors.yellow};

  @media ${device.tablet} {
    font-family: VTF Redzone Classic;
    font-size: 48px;
    font-weight: 400;
    line-height: 38px;
    letter-spacing: 0.25em;
    text-align: left;
    text-transform: uppercase;
  }
`;

export const StyledSocialMediaContainer = styled(StyledHorizontalContainer)`
  align-self: end;
`;
