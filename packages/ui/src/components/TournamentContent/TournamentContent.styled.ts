import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";
import { StyledHorizontalContainer } from "../Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../Layout/VerticalContainer/VerticalContainer.styled";

export const StyledTournamentImage = styled.img`
  width: 30%;
  border-radius: 8px 0 0 8px;
  object-fit: cover;

  @media ${device.tablet} {
    width: 20%;
  }

  @media ${device.desktop} {
    width: 10%;
  }
`;

export const StyledTitleContainer = styled(StyledVerticalContainer)`
  @media ${device.tablet} {
    width: 40%;
  }
`;

export const StyledTournamentInfoContainer = styled(StyledVerticalContainer)`
  padding: 0.5rem 1rem 0.5rem 1rem;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  position: relative;

  @media ${device.tablet} {
    padding: 1.5rem;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

export const StyledTournamentTitle = styled.p`
  color: ${colors.yellow};
  font-family: VTF Redzone Classic;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.25em;
  text-align: left;

  @media ${device.tablet} {
    font-size: 28px;
    line-height: 28px;
  }

  @media ${device.desktop} {
    font-size: 32px;
    line-height: 32px;
  }
`;

const positionColorMap: { [position: string]: string } = {
  "1st": "#D4AF37",
  "2nd": "#363636",
  "3rd": "#9F7A34",
};

export const StyledPlayerPositionContainer = styled.div<{ position: string }>`
  ${({ position, theme }) => `
    align-self: end;
    background-color: ${
      Object.keys(positionColorMap).includes(String(position))
        ? positionColorMap[position]
        : theme.colors.darkPurple
    };
    margin-top: -0.5rem;
    margin-right: -1rem;
    position: absolute;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    white-space: nowrap;

    @media ${device.tablet} {
      right: 0;
      top: 0;
      margin: 0;
    }

    @media ${device.desktop} {
      top: auto;
      right: auto;
      position: relative;
      align-self: center;
      background-color: transparent;
      padding: 1rem;
      border-radius: 10px;
      border: 3px solid;
      border-color: ${
        Object.keys(positionColorMap).includes(String(position))
          ? positionColorMap[position]
          : "transparent"
      };
    }
  `}
`;

export const StyledPlayerPosition = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.1em;
  text-align: left;

  @media ${device.tablet} {
    font-size: 20px;
    line-height: 20px;
  }

  @media ${device.desktop} {
    font-size: 20px;
    line-height: 20px;
  }
`;

export const StyledTournamentExtraInfo = styled(StyledHorizontalContainer)`
  justify-content: space-between;
  width: 100%;
`;

export const StyledExtraInfo = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.3em;
  text-align: left;
  text-transform: uppercase;
`;

export const StyledTournamentSet = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  text-transform: uppercase;
  color: #f5f5f5;

  @media ${device.tablet} {
    font-size: 20px;
    line-height: 20px;
  }
`;

export const StyledTournamentInfoInnerContainer = styled(
  StyledHorizontalContainer
)`
  @media ${device.tablet} {
    width: 50%;
    justify-content: space-between;
  }

  @media ${device.desktop} {
    width: 50%;
    justify-content: space-between;
  }
`;

export const StyledRegionDateContainer = styled(StyledVerticalContainer)``;
