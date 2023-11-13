import {
  ButtonContainer,
  ButtonVariants,
  ColorSchemes,
  IconContainer,
  TextContainer,
} from "./Button.styled";

export interface ButtonProps {
  variant?: ButtonVariants;
  icon?: string;
  colorScheme?: ColorSchemes;
}

export const Button = ({
  children,
  icon,
  colorScheme,
  variant,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <ButtonContainer colorScheme={colorScheme} variant={variant}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <TextContainer>{children}</TextContainer>
    </ButtonContainer>
  );
};
