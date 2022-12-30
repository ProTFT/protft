import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledContainer = styled.div`
  background-color: ${colors.blackBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem 6rem 2rem;
  gap: 0.5rem;

  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem;
  }
`;

export const StyledFooterText = styled.p`
  font-family: Roboto;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-align: left;
  color: ${colors.grayText};
`;

export const StyledDivider = styled.div`
  height: 0.1rem;
  width: 100%;
  background-color: ${colors.dividerGray};
`;
