import styled from "styled-components";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../design/colors";

export const StyledContainer = styled(StyledVerticalContainer)`
  padding: 2rem 0rem 2rem 0rem;
  align-items: center;
`;

export const StyledMessage = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 32px;
  font-weight: 400;
  line-height: 60px;
  letter-spacing: 0.1em;
  text-align: left;
  color: ${colors.yellow};
`;

export const StyledSubMessage = styled.p`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.4em;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
`;

export const StyledLink = styled.a`
  cursor: pointer;
  text-decoration: underline ${colors.yellow};
`;
