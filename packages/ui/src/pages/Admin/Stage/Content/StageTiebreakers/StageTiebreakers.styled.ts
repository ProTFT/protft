import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../../../design/colors";

export const StyledTiebreakerListItem = styled(StyledHorizontalContainer)<{
  clickable?: boolean;
}>`
  padding: 0.5rem;
  gap: 0.5rem;
  border: 0.001rem solid ${colors.white};
  color: ${colors.white};
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1em;
  text-align: left;
  ${({ clickable = false }) => clickable && `cursor: pointer;`}
`;

export const StyledTitle = styled.p`
  color: ${colors.yellow};
  font-family: VTF Redzone Classic;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.25em;
`;
