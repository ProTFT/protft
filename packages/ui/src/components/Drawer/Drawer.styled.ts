import styled from "styled-components";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

interface StyledContainerProps {
  isOpen: boolean;
}

export const StyledContainer = styled.div<StyledContainerProps>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.98;
  transition: 0.25s ease-in-out;
  left: ${(props) => (props.isOpen ? "0" : "-100%")};
  padding: 0.5rem 1rem 6rem 2rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 3rem;
  z-index: 1;

  @media ${device.tablet} {
    width: 50%;
    left: ${(props) => (props.isOpen ? "0" : "-50%")};
  }
`;

export const StyledDrawerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const StyledTitle = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 32px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledDrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 1rem;
  height: 100%;

  @media ${device.tablet} {
    padding-left: 2rem;
    padding-rigth: 2rem;
  }
`;

export const StyledDrawerFooter = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 3rem;
  padding-left: 2rem
  padding-rigth: 2rem;
`;
