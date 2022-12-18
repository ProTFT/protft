import styled from "styled-components";
import { colors } from "../../../design/colors";

export const StyledPlayerCardHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

export const StyledPlayerImage = styled.div`
  background-color: blue;
  height: 3rem;
  width: 3rem;
  border: 3px solid ${colors.yellow};
  border-radius: 50%;
`;

export const StyledPlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledPlayerCardBottom = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const StyledPlayerName = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.3em;
  text-align: left;
  text-transform: uppercase;
`;

export const StyledDetailsButton = styled.p`
  font-family: Roboto;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-align: left;
  text-transform: uppercase;
`;
