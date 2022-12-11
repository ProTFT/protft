import { Box } from "@chakra-ui/react";
import styled from "styled-components";
import { device } from "../../../design/breakpoints";

export const StyledContainer = styled(Box)`
  width: 100%;
  background-image: url("./homebg.webp");
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;

  @media ${device.tablet} {
    padding: 4rem 1rem 3rem 1rem;
  }
`;
