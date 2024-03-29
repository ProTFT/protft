import styled from "styled-components";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../../design/breakpoints";

export const StyledContainer = styled(StyledVerticalContainer)`
  width: 100%;
  align-items: center;
  padding-top: 4rem;
  padding-bottom: 3rem;
  gap: 2rem;
`;

export const StyledSectionTitle = styled.p`
  ${({ theme }) => `
    font-family: ${theme.fonts.title};
    font-weight: 400;
    font-size: 32px;
    line-height: 24px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${theme.colors.yellow};
    text-align: center;
  `}
`;

export const StyledOuterBox = styled.div`
  display: flex;
  gap: 3rem;
  padding-left: 2rem;
  padding-right: 2rem;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    padding-left: 25%;
    padding-right: 25%;
  }

  @media ${device.desktop} {
    flex-direction: row;
  }
`;

export const StyledInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;
  padding-bottom: 2rem;
  flex: 1;

  @media ${device.desktop} {
    align-items: start;
  }
`;

export const StyledPlayerName = styled.p`
  ${({ theme }) => `
    font-family: ${theme.fonts.title};
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${theme.colors.yellow};
  `}
`;

export const StyledPlayerDescription = styled.p`
  ${({ theme }) => `
    font-family: ${theme.fonts.body};
    font-size: 14px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.05em;
    text-align: left;
    flex-grow: 0;
    color: #999999;
  `}
`;

interface PlayerImageProps {
  url: string;
}

export const StyledPlayerImage = styled.div<PlayerImageProps>`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.url});

  @media ${device.desktop} {
    width: 250px;
    height: 250px;
  }
`;
