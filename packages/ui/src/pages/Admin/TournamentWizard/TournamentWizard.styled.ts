import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { colors } from "../../../design/colors";

export const StyledContainer = styled(StyledHorizontalContainer)`
  gap: 3rem;
  padding: 6rem;
`;

export const StyledSection = styled(StyledVerticalContainer)`
  padding: 1rem;
  gap: 1rem;
`;

export const StyledText = styled.p<{ highlighted?: boolean }>`
  font-family: Roboto;
  font-size: 20px;
  font-weight: 600;
  line-height: 38px;
  text-align: left;
  ${(props) => (props.highlighted ? "color: blue" : "")}
`;

export const StyledTitle = styled(StyledText)`
  font-size: 24px;
  color: ${colors.yellow};
`;

export const StyledInput = styled.input`
  height: 1.5rem;
  width: 2rem;
`;

export const StyledButton = styled.button`
  height: 1.5rem;
  cursor: pointer;
`;
