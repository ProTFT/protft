import styled from "styled-components";
import { StyledHorizontalContainer } from "../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../design/colors";

export const StyledStatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-evenly;
  padding-bottom: 2rem;
  padding-top: 1rem;
`;

export const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledStatTitle = styled.p`
  font-family: Roboto;
  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.4em;
  text-align: left;
  text-transform: uppercase;
`;

export const StyledStatValue = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 36px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-align: center;
`;

export const StyledTourneyStatsContainer = styled.div`
  background-color: #191919;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export const StyledTitle = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 32px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.yellow};
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
`;

export const StyledImage = styled.div`
  background-image: url("/milk.png");
  width: 64px;
  height: 64px;
  background-size: cover;
  border-radius: 50%;
`;

export const StyledHeaderContainer = styled(StyledHorizontalContainer)`
  display: flex;
  width: 100%;
  background-color: ${colors.otherBlack};
  box-shadow: 0px 12px 9px rgba(0, 0, 0, 0.25);
`;

export const StyledPlayerInfo = styled(StyledVerticalContainer)`
  padding: 1rem;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StyledPlayerName = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-align: left;
  text-transform: uppercase;
  color: ${colors.yellow};
`;
