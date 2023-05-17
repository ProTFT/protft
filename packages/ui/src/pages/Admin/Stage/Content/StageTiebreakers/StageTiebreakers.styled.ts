import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../../../design/colors";

export const StyledContainer = styled(StyledHorizontalContainer)`
  padding: 4rem;
  gap: 10rem;
  min-height: 50rem;
`;

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

export const StyledStageTiebreakerBar = styled(StyledHorizontalContainer)`
  justify-content: space-between;
  gap: 1rem;
`;

export const StyledTitle = styled.p`
  color: ${colors.yellow};
  font-family: VTF Redzone Classic;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.25em;
`;

export const StyledStageTiebreakerList = styled(StyledVerticalContainer)`
  border: 0.2rem solid ${colors.yellow};
  min-width: 50rem;
  height: 100%;
  padding: 1.5rem;
  gap: 1rem;
`;
