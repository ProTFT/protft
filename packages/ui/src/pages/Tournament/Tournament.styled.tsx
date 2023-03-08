import styled from "styled-components";
import { StyledHorizontalContainer } from "../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledTournamentName = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledHeaderContainer = styled.header`
  display: flex;
  width: 100%;
  background-color: ${colors.otherBlack};
  box-shadow: 0px 12px 9px rgba(0, 0, 0, 0.25);
`;

export const StyledTournamentInfo = styled(StyledHorizontalContainer)`
  align-items: center;
`;

export const StyledBodyContainer = styled.div`
  background-color: ${colors.blackBackground};
  height: 100%;

  @media ${device.desktop} {
    padding: 2rem 6rem 2rem 6rem;
  }
`;

export const StyledTournamentImage = styled.div`
  width: 40%;
  height: 10rem;
  background-color: blue;

  @media ${device.tablet} {
    width: 20%;
  }
`;
