import styled from "styled-components";
import { device } from "../../design/breakpoints";

export const StyledContainer = styled.div`
  border: #990000 1px solid;
  background-color: #990000;
  padding: 0.5rem;
  border-radius: 8px;
  color: white;
  font-family: Roboto;
  font-size: 12px;
  line-height: 12px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  align-self: end;

  @media ${device.tablet} {
    align-self: center;
  }

  @media ${device.desktop} {
    font-size: 20px;
    line-height: 20px;
    align-self: center;
  }
`;
