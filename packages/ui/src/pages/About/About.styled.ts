import styled from "styled-components";
import { StyledHorizontalContainer } from "../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { device } from "../../design/breakpoints";
import { colors } from "../../design/colors";

export const StyledContainer = styled(StyledVerticalContainer)``;

export const StyledHeader = styled(StyledHorizontalContainer)`
  padding: 2rem;
  background-color: #141414;
  gap: 3rem;
  align-items: center;

  @media ${device.tablet} {
    padding: 2rem 2rem 2rem 0rem;
  }
`;

export const StyledHeaderContent = styled(StyledVerticalContainer)`
  gap: 2rem;
`;

export const StyledTitle = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 36px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledText = styled.p`
  font-family: Roboto;
  font-size: 20px;
  font-weight: 300;
  line-height: 36px;
  letter-spacing: 0.05em;
  text-align: left;
`;

export const StyledTextSection = styled(StyledVerticalContainer)`
  padding: 2rem;
  gap: 1rem;
  background-color: #191919;

  @media ${device.tablet} {
    padding: 2rem 6rem 2rem 6rem;
  }
`;

export const StyledSubtitle = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledLink = styled.a`
  text-decoration: underline ${colors.yellow};
`;
