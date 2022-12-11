import styled from "styled-components";
import { colors } from "../../design/colors";

export const StyledContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${colors.pitchBlack};
  gap: 1rem;
`;

export const StyledSearchInput = styled.input`
  width: 100%;
  border-bottom: 2px solid ${colors.grayLine};
  background-image: url(./search.png);
  background-repeat: no-repeat;
  background-position: right;
  background-color: transparent;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  ::placeholder {
    font-family: "Roboto";
    font-weigth: 400;
    font-size: 16px;
    line-heigth: 38px;
  }
`;

export const StyledListItem = styled.div`
  border-radius: 8px;
  background-color: ${colors.otherBlack};
  box-shadow: 0px 12px 9px rgba(0, 0, 0, 0.25);
  display: flex;
`;

export const StyledTournamentImage = styled.img`
  width: 30%;
  border-radius: 8px 0 0 8px;
`;

export const StyledTournamentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: start;
  justify-content: space-between;
`;

export const StyledTournamentTitle = styled.p`
  font-family: "VTF Redzone Classic";
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledRegionText = styled.p`
  font-family: "Roboto";
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-align: left;
  text-transform: uppercase;
`;

export const StyledDateText = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledTournamentInfoInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
`;

export const StyledHorizontalContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justifycontent: center;
  alignitems: center;
`;
