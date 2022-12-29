import styled from "styled-components";
import { colors } from "../../design/colors";

export const StyledNavBarButton = styled.div<{ selected: boolean }>`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: ${({ selected }) => (selected ? colors.yellow : colors.gray)};
`;
