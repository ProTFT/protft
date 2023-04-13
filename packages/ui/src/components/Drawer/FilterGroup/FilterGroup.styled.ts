import styled from "styled-components";
import { colors } from "../../../design/colors";
import { StyledHorizontalContainer } from "../../Layout/HorizontalContainer/HorizontalContainer.styled";

export const StyledOptionText = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.4em;
  text-align: left;
  text-transform: uppercase;
`;

export const StyledSubTitle = styled.p`
  font-family: VTF Redzone Classic;
  font-size: 32px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.25em;
  text-align: left;
  color: ${colors.white};
  align-self: start;
  margin-bottom: 1rem;
`;

export const StyledOptionContainer = styled(StyledHorizontalContainer)`
  gap: 0.5rem;
  align-items: center;
`;
