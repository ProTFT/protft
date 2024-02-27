import styled from "styled-components";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { colors } from "../../../design/colors";

export const SetDropdownContainer = styled(StyledHorizontalContainer)(
  ({ theme }) => ({
    flexDirection: "row-reverse",
    alignItems: "center",
  })
);

export const StyledAppliedStatFilter = styled(StyledHorizontalContainer)`
  background-color: ${colors.yellow};
  border-radius: 4px;
  padding: 0.5rem;
  font-family: Roboto;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${colors.pitchBlack};
  height: fit-content;
`;
