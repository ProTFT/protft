import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledSearchInput = styled.input`
  width: 100%;
  border-bottom: 2px solid ${colors.grayLine};
  background-image: url(/search.png);
  background-repeat: no-repeat;
  background-position: right;
  background-color: transparent;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: ${colors.white};

  ::placeholder {
    font-family: "Roboto";
    font-weigth: 400;
    font-size: 16px;
    line-heigth: 38px;
    color: ${colors.gray};
    opacity: 1;
  }

  @media ${device.tablet} {
    width: 50%;
  }
`;
