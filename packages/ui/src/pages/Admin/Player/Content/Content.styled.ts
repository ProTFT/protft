import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../../design/colors";

export const StyledContainer = styled(StyledVerticalContainer)``;

export const StyledTabContainer = styled(StyledHorizontalContainer)`
  justify-content: center;
  gap: 10rem;
  padding: 2rem 2rem 0rem 2rem;
  align-items: flex-end;
  background-color: ${colors.blackBackground};
`;

export const StyledTabButton = styled.button<{ selected: boolean }>`
  cursor: pointer;
  background-color: transparent;
  color: ${colors.yellow};
  font-family: VTF Redzone Classic;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.25em;

  ${({ selected }) =>
    selected && `border-bottom: 0.2rem solid ${colors.yellow};`}
`;
