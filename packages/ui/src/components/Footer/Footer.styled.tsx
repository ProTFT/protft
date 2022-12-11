import { Box, Text } from "@chakra-ui/react";
import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledContainer = styled(Box)`
  background-color: ${colors.pitchBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem 6rem 2rem;
  gap: 0.5rem;

  @media ${device.tablet} {
    background-color: ${colors.pitchBlack};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem;
  }
`;

export const StyledFooterText = styled(Text)`
  font-weigth: "Roboto";
  font-size: 14px;
  line-height: 38px;
  color: ${colors.grayText};
`;
