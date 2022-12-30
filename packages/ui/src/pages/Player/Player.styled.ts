import styled from "styled-components";
import { StyledHorizontalContainer } from "../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledStatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-evenly;
  padding-bottom: 2rem;
  padding-top: 1rem;

  @media ${device.tablet} {
    justify-content: start;
    gap: 5rem;
    padding: 2rem;
  }
`;

export const StyledTourneyStatsContainer = styled(StyledVerticalContainer)`
  background-color: #191919;
  padding: 1rem;
  gap: 1rem;

  @media ${device.tablet} {
    margin-left: -4rem;
    margin-right: -4rem;
    padding: 4rem;
    gap: 2rem;
  }
`;

export const StyledTitle = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 32px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.yellow};
  margin-bottom: 2rem;
`;

export const StyledTournamentName = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-align: left;
  text-transform: uppercase;
`;

export const StyledTournamentInfo = styled(StyledHorizontalContainer)`
  justify-content: space-between;
  align-items: flex-end;

  @media ${device.tablet} {
    gap: 3rem;
    align-items: flex-start;
  }
`;

export const StyledImage = styled.div<{ src: string }>`
  background-image: url("${(props) => props.src}");
  height: 4rem;
  width: 6rem;
  background-size: cover;
  border-radius: 50%;

  @media ${device.tablet} {
    height: 4rem;
    width: 4rem;
  }
`;

export const StyledHeaderContainer = styled(StyledHorizontalContainer)`
  display: flex;
  width: 100%;
  background-color: ${colors.otherBlack};
  box-shadow: 0px 12px 9px rgba(0, 0, 0, 0.25);

  @media ${device.tablet} {
    border-radius: 8px;
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

export const StyledPageContainer = styled.div`
  background-color: ${colors.blackBackground};
  padding: 0rem;

  @media ${device.tablet} {
    padding: 4rem;
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

export const StyledTournamentBasicInfo = styled(StyledHorizontalContainer)`
  align-items: center;
  gap: 1rem;
`;

export const StyledDetailsButtonContainer = styled(StyledHorizontalContainer)`
  align-items: center;
  align-self: end;
`;
