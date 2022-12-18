import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../../design/breakpoints";
import { colors } from "../../../design/colors";

export const StyledTournamentInfoInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
  width: 100%;
`;

export const StyledListItem = styled.div`
  border-radius: 8px;
  background-color: ${colors.blackTiles};
  box-shadow: 0px 12px 9px rgba(0, 0, 0, 0.25);
  display: flex;
  width: 100%;
`;

export const StyledTournamentImage = styled.img`
  width: 30%;
  border-radius: 8px 0 0 8px;
`;

export const StyledTournamentInfoContainer = styled(StyledVerticalContainer)`
  padding: 1rem;
  align-items: start;
  justify-content: space-between;
  width: 100%;

  @media ${device.tablet} {
    padding: 2rem;
  }
`;

export const StyledTournamentTitle = styled.p`
  color: ${colors.yellow};
  font-family: VTF Redzone Classic;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.25em;
  text-align: left;

  @media ${device.tablet} {
    font-size: 32px;
    line-height: 32px;
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
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  text-transform: uppercase;
  color: #f5f5f5;
`;
