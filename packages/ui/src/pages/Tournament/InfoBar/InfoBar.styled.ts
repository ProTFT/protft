import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../design/colors";

export const StyledInfoBar = styled(StyledHorizontalContainer)`
  justify-content: space-around;
  padding-top: 1rem;
`;

export const StyledInfoIndicatorText = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.3em;
  text-align: left;
  color: ${colors.white};
  text-transform: uppercase;
`;
