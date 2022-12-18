import { CSSProperties } from "styled-components";
import { StyledRoundedContainer } from "./RoundedContainer.styled";

export type RoundedContainerProps = React.PropsWithChildren<CSSProperties>;

export const RoundedContainer = ({
  children,
  color,
  padding,
  gap,
}: RoundedContainerProps) => {
  return (
    <StyledRoundedContainer color={color} padding={padding} gap={gap}>
      {children}
    </StyledRoundedContainer>
  );
};
