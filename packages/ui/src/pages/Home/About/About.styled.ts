import styled from "styled-components";
import { device } from "../../../design/breakpoints";

export const StyledContainer = styled.div`
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
  padding-bottom: 2rem;

  @media ${device.tablet} {
    padding: 4rem 1rem 3rem 1rem;
  }
`;
